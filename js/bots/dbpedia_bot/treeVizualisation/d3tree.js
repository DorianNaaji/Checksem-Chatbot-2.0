// managing the tree

var margin =
        {
            top: 20, right: 120, bottom: 20, left: 80
        },
    width = 500 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom;

// other vars
var i,
    duration,
    root;
var tree;

var diagonal = d3.svg.diagonal()
    .projection(function(d)
    {
        return [d.y, d.x];
    });

// the svg
var svg;


/*
 * Function called after the callbackSubject : creates a tree with a json object in parameter, in string format.
 */
function appendTree(jsonString)
{
    i = 0;
    duration = 750;
    tree = d3
        .layout
        .tree()
        .size([360, 260]);
    svg = d3
        .select("ul#word-bot-mess")
        .append("li")
        .attr("class", "word-bot-sent")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // retrieving data
    var toParse = '[' + jsonString + ']';
    var json = JSON.parse(toParse);
    var treeData = json;

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;
    update(root);
    d3.select(self.frameElement).style("height", "500px");
}



/*
 * Function managing and appareance
 */
function update(source)
{
    // setting up the layout for the tree
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // we manage depth
    nodes.forEach(function(d)
    {
        d.y = d.depth * 180;
    });

    // actualization of the nodes
    var node = svg
        .selectAll("g.node")
        .data(nodes, function(d)
        {
            return d.id || (d.id = ++i);
        });

    // allow to make nodes disappearing with animations
    var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d)
        {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d)
        {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append("text")
        .attr("x", function(d)
        {
            return d.children || d._children ? -13 : 13;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d)
        {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d)
        {
            return d.name;
        })
        .style("fill-opacity", 1e-6);

    // managing transitions
    var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function(d)
        {
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeUpdate
        .select("circle")
        .attr("r", 10)
        .style("fill", function(d)
        {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeUpdate
        .select("text")
        .style("fill-opacity", 1);

    // managing transitions
    var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", function(d)
        {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit
        .select("circle")
        .attr("r", 1e-6);

    nodeExit
        .select("text")
        .style("fill-opacity", 1e-6);

    // actualization of the links
    var link = svg
        .selectAll("path.link")
        .data(links, function(d)
        {
            return d.target.id;
        });

    // managing links
    link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d)
        {
            var o =
                {
                    x: source.x0, y: source.y0
                };
            return diagonal(
                {
                    source: o, target: o
                });
        });

    // transitions of links
    link
        .transition()
        .duration(duration)
        .attr("d", diagonal);

    // managing transitions
    link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d)
        {
            var o =
                {
                    x: source.x, y: source.y
                };
            return diagonal(
                {
                    source: o, target: o
                });
        })
        .remove();

    // keep position in memory
    nodes.forEach(function(d)
    {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// display children on click
function click(d)
{
    if (d.children)
    {
        d._children = d.children;
        d.children = null;
    }
    else
    {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}