-- Repair LaTex commands that JavaScript string escapes previously turned into line breaks.
-- This is intentionally a forward migration: some affected content may already be published.
begin;

update public.question_hints
set content_markdown = $latex$A integral de $x^n$ é $x^{n+1}/(n+1)$, com $n\ne-1$.$latex$
where id = '60000000-0000-4000-8000-000000100392';

update public.question_solution_steps
set content_markdown = $latex$Há solução única se e somente se $\det A\ne0$.$latex$
where id = '70000000-0000-4000-8000-000009000132';

update public.question_hints
set content_markdown = $latex$Com $b\ne0$, o vetor zero não resolve o sistema.$latex$
where id = '60000000-0000-4000-8000-000009000363';

update public.question_solution_steps
set content_markdown = case id
  when '70000000-0000-4000-8000-000009000362' then $latex$$x-x_p\in\operatorname{Nul}(A)$.$latex$
  when '70000000-0000-4000-8000-000009000363' then $latex$$x=x_p+z$ com $z\in\operatorname{Nul}(A)$.$latex$
  when '70000000-0000-4000-8000-000009000364' then $latex$Como $A0=0\ne b$, a origem não pertence ao conjunto e ele não é subespaço.$latex$
end
where id in (
  '70000000-0000-4000-8000-000009000362',
  '70000000-0000-4000-8000-000009000363',
  '70000000-0000-4000-8000-000009000364'
);

update public.question_options
set content_markdown = case id
  when '50000000-0000-4000-8000-000009000441' then $latex$$a\ne0$$latex$
  when '50000000-0000-4000-8000-000009000444' then $latex$$a\ne1$ e $a\ne-1$$latex$
  when '50000000-0000-4000-8000-000009000551' then $latex$$F(0,0)\ne(0,0)$$latex$
end
where id in (
  '50000000-0000-4000-8000-000009000441',
  '50000000-0000-4000-8000-000009000444',
  '50000000-0000-4000-8000-000009000551'
);

update public.question_solutions
set final_answer_markdown = case question_id
  when '40000000-0000-4000-8000-000000900044' then $latex$$a\ne1$ e $a\ne-1$$latex$
  when '40000000-0000-4000-8000-000000900055' then $latex$$F(0,0)\ne(0,0)$$latex$
end
where question_id in (
  '40000000-0000-4000-8000-000000900044',
  '40000000-0000-4000-8000-000000900055'
);

update public.question_solution_steps
set content_markdown = $latex$Se $(x,y)\ne0$, ao menos um termo é positivo.$latex$
where id = '70000000-0000-4000-8000-000009001023';

commit;
