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
