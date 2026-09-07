"""Independent symbolic checks for authored fixtures; not a substitute for human review.

Run with Python and sympy==1.14.0. Expressions come only from repository-owned
fixtures, never from remote or user-supplied content. No production access.
"""
import json
from pathlib import Path
import sympy as s

x = s.Symbol('x', positive=True)
n = s.Symbol('n', integer=True, positive=True)
def parse(value):
    return s.sympify(str(value), locals={'x': x, 'n': n}, rational=True)
def equal(actual, expected):
    assert s.simplify(actual - parse(expected)) == 0, (actual, expected)

items = json.loads(Path('content/calculus-2/verification.json').read_text(encoding='utf-8'))
for item in items:
    v = item['verification']
    kind = v['kind']
    try:
        if kind == 'antiderivative':
            differences = [s.simplify(s.trigsimp(s.diff(parse(p), x) - parse(v['integrand']))) for p in v['primitives']]
            assert differences[0] == 0, differences
            assert all(d != 0 and d.equals(0) is not True for d in differences[1:]), differences
        elif kind == 'improper':
            if v['expected'] == 'divergent-split':
                assert s.integrate(1/x, (x, 0, 1)) == s.oo
                # The negative side follows by x=-t and is -infinity.
                assert s.integrate(-1/x, (x, 0, 1)) == -s.oo
            elif v['integrand'] == '1/sqrt(Abs(x))':
                equal(2*s.integrate(1/s.sqrt(x), (x,0,1)),v['expected'])
            else:
                result = s.integrate(parse(v['integrand']), (x,parse(v['lower']),parse(v['upper'])))
                assert result == parse(v['expected']) or s.simplify(result-parse(v['expected'])) == 0, result
        elif kind == 'sequence':
            expr = parse(v['expression'])
            equal(s.limit(expr,n,s.oo),v['expected'])
            if v.get('monotonic'):
                sign = 1 if v['monotonic'] == 'increasing' else -1
                delta = expr.subs(n,n+1)-expr
                for index in range(1,100):
                    assert sign*delta.subs(n,index).evalf() > 0
        elif kind == 'series':
            expr = parse(v['expression'])
            expected = v['expected']
            if expected in ['convergent','divergent']:
                assert bool(s.Sum(expr,(n,v['start'],s.oo)).is_convergent()) == (expected=='convergent')
            elif v['expression'].startswith('log('):
                # Telescope the product before taking its logarithm.
                product = s.product((n+1)**2/(n*(n+2)),(n,1,s.Symbol('N',integer=True,positive=True)))
                equal(s.log(s.limit(product,s.Symbol('N',integer=True,positive=True),s.oo)),expected)
            else:
                equal(s.summation(expr,(n,v['start'],s.oo)),expected)
        elif kind == 'convergence-test':
            expr = parse(v['expression'])
            method = v['method']
            if method == 'ratio':
                result = s.limit(s.simplify(expr.subs(n,n+1)/expr),n,s.oo)
                assert result == parse(v['limit']), result
            elif method == 'root':
                equal(s.limit(expr**(1/n),n,s.oo),v['limit'])
            elif method.startswith('limit-comparison'):
                comparison = 1/n if method.endswith('harmonic') else 1/n**2
                equal(s.limit(expr/comparison,n,s.oo),v['limit'])
            else:
                comparison = parse(v['limit'])
                for index in range(1,100):
                    a,b = expr.subs(n,index),comparison.subs(n,index)
                    assert a<=b if v['expected']=='convergent' else a>=b
            assert bool(s.Sum(expr,(n,1,s.oo)).is_convergent()) == (v['expected']=='convergent')
        elif kind.startswith('alternating'):
            expr=parse(v['expression'])
            equal(s.limit(expr,n,s.oo),'0')
            assert s.factor(expr-expr.subs(n,n+1)).is_positive
            if kind=='alternating':
                assert bool(s.Sum(expr,(n,1,s.oo)).is_convergent()) == v['absolute']
            elif kind=='alternating-minimum':
                terms=v['expected']
                assert expr.subs(n,terms+1)<=parse(v['tolerance'])<expr.subs(n,terms)
            else:
                equal(expr.subs(n,v['terms']+1),v['expected'])
                if kind=='alternating-signed-error': assert (-1)**(v['terms']+2)==1
        elif kind=='power':
            coefficient=parse(v['coefficient'])
            radius=s.limit(s.simplify(coefficient/coefficient.subs(n,n+1)),n,s.oo)
            assert radius == parse(v['radius']), radius
            if v['endpoints']:
                for endpoint,expected in zip([-radius,radius],v['endpoints']):
                    expr=s.simplify(coefficient*endpoint**n)
                    assert bool(s.Sum(expr,(n,1,s.oo)).is_convergent()) == expected
        elif kind=='taylor':
            equal(s.series(parse(v['expression']),x,v['center'],v['degree']+1).removeO(),v['expected'])
        elif kind=='taylor-error':
            error=abs((parse(v['expression'])-parse(v['polynomial'])).subs(x,parse(v['at'])).evalf(30))
            assert error < parse(v['bound'])
        else:
            raise AssertionError('Unknown verification kind')
        print(f"PASS #{item['issue']} {item['id']}")
    except Exception as error:
        raise AssertionError(f"Question {item['id']}: {error}") from error
print(f'{len(items)} symbolic checks passed. Independent technical/pedagogical review remains pending.')
