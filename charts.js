function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var metadata = data.samples;
    console.log(metadata);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    //console.log(resultArray);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    //console.log(result)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    //console.log(otu_ids);
    var otu_labels = result.otu_labels;
    console.log('labels' + otu_labels);
    var sample_values = result.sample_values;
    //console.log(sample_values);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = sample_values.slice(0,10).reverse().map(data => data);
    console.log(yticks)
    var xticks = otu_ids.slice(0,10).reverse().map(data => 'OTU '+data);
    console.log(xticks)
    ////////////////////////Bar Chart/////////////////////
    // 8. Create the trace for the bar chart. 
    var barData = [
      {
      x:yticks,  y:xticks, type: "bar", orientation: "h" }
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Belly Button Biodiversity Dashboard',
      //xaxis :{title : 'OTU'} ,
      //yaxis : {title :'Top Ten cultures found'} ,
      height: 400,
      width: 450,
      font: {family: 'Times New Roman',size: 15, color: 'blue'}
    };
    // 10. Use Plotly to plot the data with the layout. 
    

    /////////////////////Bubble chart//////////////////////////////
    // Bar and Bubble charts 
        //Plotly.newPlot("bar", barData, barLayout);
        console.log('Bubble chart is accessed')
        // 1. Create the trace for the bubble chart.
        var bubbleData = [ { x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
          
        }
      }];
     
        // 2. Create the layout for the bubble chart.
        var bubbleLayout = {
          title: 'Bacteria Culture Per Sample',
          showlegend: false,
          height: 750,
          width: 1200,
          xaxis :{title : 'OTU'}
        };
  
        // 3. Use Plotly to plot the data with the layout.
        
        
        ///////////////GAUGE CHART/////////////////////
         // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
      var meta = data.metadata
      // Create a variable that holds the first sample in the array.
      
      var resultArray2 = meta.filter(sampleObj => sampleObj.id == sample);
      // 2. Create a variable that holds the first sample in the metadata array.
      var result2 = resultArray2[0];
      console.log('GAUGE CHART ACCESSED')
      console.log(result2)

      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids2 = result2.otu_ids;
      console.log(otu_ids);
      var otu_labels2 = result2.otu_labels;
      //console.log('labels' + otu_labels2);
      var sample_values2 = result2.sample_values;  
      
      // 3. Create a variable that holds the washing frequency.
      var wfreq = result2.wfreq;
      console.log(wfreq)
      // Create the yticks for the bar chart.
      // Use Plotly to plot the bar data and layout.
      Plotly.newPlot("bar", barData, barLayout);
      
      // Use Plotly to plot the bubble data and layout.
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    
      
      // 4. Create the trace for the gauge chart.
     
      var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: 'Belly Button Washing Frequency' +'<br>'+'scrubs per week',
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 10] },
        bar: { color: "black" },
        steps: [
          { range: [0, 2], color: "red" },
          { range: [2, 4], color: "orange" },
          { range: [4, 6], color: "yellow" },
          { range: [6, 8], color: "yellowgreen" },
          { range: [8, 10], color: "darkgreen" },
          
        ],
        
      }
    }
  ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { width: 550, height: 400, margin: { t: 0, b: 0 },paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" } };
      

      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot('GAUGE', gaugeData, gaugeLayout);
  });
}
