// Button to go to the top of the page
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

//Road map
document.addEventListener("DOMContentLoaded", () => {
const data = {
    name: "",
    children: [
        { name: "Step one", children: [{ name: "GPTs" }, { name: "LLMs" }] },
        { name: "Step two", children: [{ name: "ChatGPT" }, { name: "Generative AI" }] },
        { name: "Prompt engnering", children: [{ name:"Concepts" }, {name: "Practical"}] },
        { name: "How to write prompts"},
    ]
};

const container = document.getElementById("mind-map-container");
let width = container.clientWidth;
let height = container.clientHeight;

// Fallback if height or width is 0
if (height === 0) height = 250;
if (width === 0) width = 300;

const svg = d3.select("#mind-map-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin-top", "10px"); // Add Top margin

const g = svg.append("g")
.attr("transform", `translate(${width / 2}, ${height / 2})`); // Start from above
const root = d3.hierarchy(data);
const tree = d3.tree().size([width - 100, height / 2]); // Make the plane Horizontale

tree(root);

const link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
        .x(d => d.x)
        .y(d => d.y)
    );

const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

node.append("circle")
    .attr("r", 5);

node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -30 : 30) // Edit the place of the text
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);

// Add zoom effect to road map
const zoom = d3.zoom()
    .scaleExtent([1.25, 1.5]) // min & max zoom levels
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
    });

svg.call(zoom); // Activate the zoom for SVG
});

// Scroll to top
const scrollUpBtn = document.getElementById("scrollUpBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add("show");
    } else {
        scrollUpBtn.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}