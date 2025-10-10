async function loadProducts() {
	try {
		const res = await fetch("data/products.json");
		const products = await res.json();

		// Sort so available items appear first
		products.sort((a, b) => (a.sold === b.sold ? 0 : a.sold ? 1 : -1));

		const container = document.getElementById("product-container");
		container.innerHTML = "";

		products.forEach((product) => {
			const card = document.createElement("div");
			card.className = "card";
			if (product.sold) card.classList.add("sold");

			// Quality label
			const qualityLabel = document.createElement("div");
			qualityLabel.className = "label quality";
			qualityLabel.textContent = "⭐".repeat(product.quality);

			// Create tooltip element
			const tooltip = document.createElement("div");
			tooltip.className = "quality-tooltip";

			// Tooltip HTML content
			tooltip.innerHTML = `
			<strong>${
				{
					5: "Excellent",
					4: "Very Good",
					3: "Good",
					2: "Fair",
					1: "Poor/Non-Functional",
				}[product.quality]
			}</strong>
			<hr style="margin:4px 0;border-color: #ccc;" />
			<div style="font-size:0.85rem; text-align:left; line-height:1.2;">
				⭐ - Poor/Non-Functional<br/>
				⭐⭐ - Fair<br/>
				⭐⭐⭐ - Good<br/>
				⭐⭐⭐⭐ - Very Good<br/>
				⭐⭐⭐⭐⭐ - Excellent
			</div>
			`;

			qualityLabel.appendChild(tooltip);

			// Discount label (only if originalPrice > price)
			let discountLabel = "";
			if (product.originalPrice && product.originalPrice > product.price) {
				const discount = Math.round(
					((product.originalPrice - product.price) / product.originalPrice) *
						100
				);

				const discountDiv = document.createElement("div");
				discountDiv.className = "label discount";
				discountDiv.textContent = `-${discount}%`;

				// Tooltip showing the original price
				const discountTooltip = document.createElement("div");
				discountTooltip.className = "discount-tooltip";
				discountTooltip.textContent = `Original Price: ₹${product.originalPrice}`;
				discountDiv.appendChild(discountTooltip);

				discountLabel = discountDiv;
			}

			// Create the image wrapper
			const imageWrapper = document.createElement("div");
			imageWrapper.className = "image-wrapper";

			const img = document.createElement("img");
			img.src = product.images[0];
			img.alt = product.name;
			imageWrapper.appendChild(img);

			// Add SOLD badge immediately if the product is sold
			if (product.sold) {
				const soldBadge = document.createElement("span");
				soldBadge.className = "sold-badge";
				soldBadge.textContent = "SOLD";
				imageWrapper.appendChild(soldBadge);
			}

			// Image cycling on hover
			if (product.images.length > 1) {
				let index = 0;
				let interval;

				imageWrapper.addEventListener("mouseenter", () => {
					interval = setInterval(() => {
						index = (index + 1) % product.images.length;
						img.src = product.images[index];
					}, 1000); // change image every 1 second
				});

				imageWrapper.addEventListener("mouseleave", () => {
					clearInterval(interval);
					img.src = product.images[0]; // reset to first image
				});
			}

			// Create rest of the card
			const info = document.createElement("div");
			info.innerHTML = `
				<h3>${product.name}</h3>
				${qualityLabel.outerHTML}
				${discountLabel ? discountLabel.outerHTML : ""}
				<p>${product.description}</p>
				<p class="price">₹${product.price}</p>
				${
					product.sold
						? '<span class="sold-text">Not available</span>'
						: `<a class="contact" href="${product.contact}" target="_blank">Contact</a>`
				}
				`;

			card.appendChild(imageWrapper);
			card.appendChild(info);
			container.appendChild(card);
		});
	} catch (err) {
		console.error("Failed to load products:", err);
	}
}

document.addEventListener("DOMContentLoaded", loadProducts);
