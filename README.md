[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/KZhXwLZL)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=20649955)
# Trabalho Prático 05 - Semanas 7 e 8

**Páginas de detalhes dinâmicas**

Nessa etapa, vamos evoluir o trabalho anterior, acrescentando a página de detalhes, conforme o  projeto escolhido. Imagine que a página principal (home-page) mostre um visão dos vários itens que existem no seu site. Ao clicar em um item, você é direcionado pra a página de detalhes. A página de detalhe vai mostrar todas as informações sobre o item do seu projeto. seja esse item uma notícia, filme, receita, lugar turístico ou evento.

Leia o enunciado completo no Canvas. 

**IMPORTANTE:** Assim como informado anteriormente, capriche na etapa pois você vai precisar dessa parte para as próximas semanas. 

**IMPORTANTE:** Você deve trabalhar e alterar apenas arquivos dentro da pasta **`public`,** mantendo os arquivos **`index.html`**, **`styles.css`** e **`app.js`** com estes nomes, conforme enunciado. Deixe todos os demais arquivos e pastas desse repositório inalterados. **PRESTE MUITA ATENÇÃO NISSO.**

## Informações Gerais

- Nome: Lucas Benevenuto Rodrigues
- Matricula: 904533
- Proposta de projeto escolhida: Site de Noticias
- Breve descrição sobre seu projeto: Eu desenvolvi um catálogo web simples onde a página inicial lista os itens de forma dinâmica a partir de um array/JSON no JavaScript. Cada card traz imagem, título e um botão “ver detalhes”. Ao clicar, o usuário é levado para uma única página de detalhes (detalhes.html), que lê o id pela URL (ex.: ?id=3) e monta o conteúdo na hora, sem precisar criar uma página para cada item. Usei apenas HTML, CSS e JavaScript, organizei a estrutura do projeto, deixei responsivo e cuidei de acessibilidade básica. Também versionei tudo com Git, fiz commits descritivos, criei tags e publiquei no GitHub. No geral, o projeto pratica manipulação do DOM, passagem de dados via query string e um fluxo de trabalho bem organizado com Git/GitHub.

## Print da Home-Page

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/c3b22a60-280c-4b56-bb8a-cbd45049f447" />

## Print da página de detalhes do item

<img width="1600" height="797" alt="image" src="https://github.com/user-attachments/assets/b812a3c2-6957-4526-9520-99959ff78f10" />


## Cole aqui abaixo a estrutura JSON utilizada no app.js

const dados = [
  {
    id: 1,
    titulo: "Prefeitura Lança Novo Plano de Mobilidade Urbana",
    descricao: "Novo plano visa melhorar o transporte público e reduzir o trânsito na cidade.",
    conteudo: "A Prefeitura apresentou nesta segunda-feira um novo plano de mobilidade urbana que inclui a criação de corredores exclusivos de ônibus, ciclovias e a requalificação de vias principais. O projeto será implementado ao longo dos próximos dois anos.",
    categoria: "Cidades",
    autor: "Joana Ribeiro",
    data: "2025-03-30",
    imagem: "img/mobilidade.jpg"
  },
  {
    id: 2,
    titulo: "Tecnologia 6G Está em Desenvolvimento",
    descricao: "Pesquisadores anunciam avanços na próxima geração de redes móveis.",
    conteudo: "Universidades e empresas de telecomunicação já estão testando tecnologias que poderão compor a infraestrutura do 6G. A expectativa é que a nova geração seja 100 vezes mais rápida que o 5G e amplie a integração entre dispositivos inteligentes.",
    categoria: "Tecnologia",
    autor: "Carlos Mendes",
    data: "2025-03-28",
    imagem: "img/tecnologia_6g.jpg"
  },
  {
    id: 3,
    titulo: "Festival de Música Reúne Mais de 50 Mil Pessoas",
    descricao: "Evento cultural movimentou o final de semana com atrações nacionais e internacionais.",
    conteudo: "Durante três dias de programação, o festival contou com a participação de mais de 40 artistas e promoveu atividades culturais e gastronômicas em paralelo. A prefeitura estima um impacto positivo no turismo local.",
    categoria: "Cultura",
    autor: "Ana Clara Silva",
    data: "2025-03-27",
    imagem: "img/festival_musica.jpg"
  }
];


function formatarDataBR(iso) {
  if (!iso) return "";
  const [yyyy, mm, dd] = iso.split("-");
  if (!yyyy || !mm || !dd) return iso;
  return `${dd}/${mm}/${yyyy}`;
}


function el(tag, className, text) {
  const $e = document.createElement(tag);
  if (className) $e.className = className;
  if (text !== undefined && text !== null) $e.textContent = text;
  return $e;
}


function criarCard(item) {
  const $card = el("article", "card");

  const $img = document.createElement("img");
  $img.src = item.imagem || "img/placeholder.jpg";
  $img.alt = item.titulo || "Imagem do item";
  $img.loading = "lazy";
  $img.onerror = () => { $img.src = "img/placeholder.jpg"; };

  const $body = el("div", "card-body");
  const $badge = el("span", "badge", item.categoria);
  const $title = el("h3", "card-title", item.titulo);
  const $desc = el("p", "card-desc", item.descricao);
  const $meta = el("div", "card-meta", `Por ${item.autor} • ${formatarDataBR(item.data)}`);

  $body.appendChild($badge);
  $body.appendChild($title);
  $body.appendChild($desc);
  $body.appendChild($meta);

  const $actions = el("div", "card-actions");
  const $link = document.createElement("a");
  $link.href = `detalhes.html?id=${encodeURIComponent(item.id)}`;
  $link.className = "btn";
  $link.textContent = "Ver detalhes";
  $link.setAttribute("aria-label", `Ver detalhes de ${item.titulo}`);
  $actions.appendChild($link);

  $card.appendChild($img);
  $card.appendChild($body);
  $card.appendChild($actions);
  return $card;
}


function renderizarHome() {
  const $lista = document.querySelector("#lista-cards");
  if (!$lista) return; 

  if (!Array.isArray(dados) || dados.length === 0) {
    const $empty = el("div", "empty", "Nenhum item disponível.");
    $lista.appendChild($empty);
    return;
  }

  
  const ordenados = [...dados].sort((a, b) => (b.data || "").localeCompare(a.data || ""));

  for (const item of ordenados) {
    $lista.appendChild(criarCard(item));
  }
}


function renderizarDetalhe() {
  const $container = document.querySelector("#detalhe-container");
  if (!$container) return; 

  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  const id = Number(idParam);

  if (!id || Number.isNaN(id)) {
    const $empty = el("div", "empty", "ID do item não informado na URL.");
    $container.appendChild($empty);
    return;
  }

  const item = dados.find(d => d.id === id);
  if (!item) {
    const $empty = el("div", "empty", "Item não encontrado.");
    $container.appendChild($empty);
    return;
  }

  
  const $header = el("div", "detalhe-header");
  const $img = document.createElement("img");
  $img.src = item.imagem || "img/placeholder.jpg";
  $img.alt = item.titulo || "Imagem do item";
  $img.loading = "eager";
  $img.onerror = () => { $img.src = "img/placeholder.jpg"; };
  $header.appendChild($img);

  
  const $body = el("div", "detalhe-body");
  const $badge = el("span", "badge", item.categoria);
  const $title = el("h2", "detalhe-title", item.titulo);

  const $meta = el("div", "detalhe-meta", `Por ${item.autor} • ${formatarDataBR(item.data)}`);

  
  const $desc = el("p", "card-desc", item.descricao);

  
  const $content = el("div", "detalhe-content", item.conteudo);

  $body.appendChild($badge);
  $body.appendChild($title);
  $body.appendChild($meta);
  $body.appendChild($desc);
  $body.appendChild($content);

  $container.appendChild($header);
  $container.appendChild($body);
}


document.addEventListener("DOMContentLoaded", () => {
  renderizarHome();
  renderizarDetalhe();
});
