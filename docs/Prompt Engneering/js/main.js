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
const width = container.clientWidth;
const height = container.clientHeight; 

const svg = d3.select("#mind-map-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin-top", "10px"); // إضافة هامش أعلى

const g = svg.append("g")
.attr("transform", `translate(${width / 2}, ${height / 2})`); // بدء التخطيط من الأعلى

const root = d3.hierarchy(data);
const tree = d3.tree().size([width - 100, height / 2]); // جعل التخطيط أفقيًا

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
    .attr("x", d => d.children ? -30 : 30) // تعديل موضع النص
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);

// إضافة خاصية التكبير والتصغير
const zoom = d3.zoom()
    .scaleExtent([1.25, 1.5]) // تحديد الحد الأدنى والأقصى لمستوى التكبير
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
    });

svg.call(zoom); // تفعيل خاصية التكبير والتصغير على SVG
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