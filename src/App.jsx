import { useState } from "react";
import "./App.css";

function App() {
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [weight, setWeight] = useState("");
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState("traditional");
  const [description, setDescription] = useState("");

  const generateDescription = () => {
    if (!productName || !ingredients || !weight || !features) {
      alert("Please fill all fields before generating description.");
      return;
    }

    let generatedText = "";

    if (tone === "premium") {
      generatedText = `Experience the finest taste of the Himalayas with ${productName}. Crafted with premium ingredients like ${ingredients}, this ${weight} pack offers a rich and authentic food experience. ${features}. Perfect for customers who value quality, purity, and traditional Himalayan goodness.`;
    } else if (tone === "health") {
      generatedText = `${productName} is a wholesome and nutritious choice made with ${ingredients}. This ${weight} pack is ideal for health-conscious customers looking for natural and traditional food options. ${features}. Enjoy the goodness of Himalayan ingredients in every serving.`;
    } else {
      generatedText = `Bring home the traditional taste of Uttarakhand with ${productName}. Made using ${ingredients}, this ${weight} pack reflects the authentic flavors of Himalayan food culture. ${features}. A perfect choice for those who love traditional and locally inspired products.`;
    }

    setDescription(generatedText);
  };

  const copyDescription = () => {
    navigator.clipboard.writeText(description);
    alert("Description copied to clipboard!");
  };

  return (
    <div className="app">
      <div className="container">
        <h1>HimShakti AI Product Description Generator</h1>
        <p className="subtitle">
          Generate e-commerce-ready product descriptions for Himalayan food products.
        </p>

        <div className="form-box">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Example: HimShakti Buransh Juice"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>Key Ingredients</label>
          <input
            type="text"
            placeholder="Example: Buransh flower extract, sugar, water"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <label>Weight / Quantity</label>
          <input
            type="text"
            placeholder="Example: 500ml or 250g"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label>Features</label>
          <textarea
            placeholder="Example: Traditional Himalayan drink, refreshing taste, no artificial colour"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          ></textarea>

          <label>Select Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="traditional">Traditional</option>
            <option value="premium">Premium</option>
            <option value="health">Health-focused</option>
          </select>

          <button onClick={generateDescription}>Generate Description</button>
        </div>

        {description && (
          <div className="output-box">
            <h2>Generated Product Description</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="button-group">
              <button onClick={generateDescription}>Regenerate</button>
              <button onClick={copyDescription}>Copy Description</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;