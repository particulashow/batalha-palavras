const words = {};

const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

const svg = d3.select("#wordcloud")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

function updateWordCloud() {
  const wordEntries = Object.keys(words).map(word => ({ text: word, size: 10 + words[word] * 5 }));

  const layout = d3.layout.cloud()
    .size([width, height])
    .words(wordEntries)
    .padding(5)
    .rotate(() => ~~(Math.random() * 2) * 90)
    .font("Montserrat")
    .fontSize(d => d.size)
    .on("end", draw);

  layout.start();

  function draw(words) {
    svg.selectAll("text").remove();

    svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("fill", () => `hsl(${Math.random() * 360}, 70%, 60%)`)
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
      .text(d => d.text);
  }
}

function simulateIncomingWords() {
  const sampleWords = ["Live", "Interação", "Público", "Comentários", "Participação", "Diversão", "Desafio", "Resposta"];
  const randomWord = sampleWords[Math.floor(Math.random() * sampleWords.length)];
  words[randomWord] = (words[randomWord] || 0) + 1;
  updateWordCloud();
}

setInterval(simulateIncomingWords, 1500);
