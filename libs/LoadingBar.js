class LoadingBar {
	constructor(options = {}) {
		// Destructure options with default values
		const {
			backgroundColor = '#000',
			opacity = 0.7,
			barBaseColor = '#aaa',
			barColor = '#ADD8E6',
			minWidth = '250px',
			width = '50%',
			height = '15px',
			borderRadius = '10px',
			zIndex = '1111',
			showPercentage = true
		} = options;

		this.domElement = document.createElement("div");
		this.domElement.style.position = 'fixed';
		this.domElement.style.top = '0';
		this.domElement.style.left = '0';
		this.domElement.style.width = '100%';
		this.domElement.style.height = '100%';
		this.domElement.style.background = backgroundColor;
		this.domElement.style.opacity = opacity.toString();
		this.domElement.style.display = 'flex';
		this.domElement.style.alignItems = 'center';
		this.domElement.style.justifyContent = 'center';
		this.domElement.style.zIndex = zIndex;

		const barContainer = document.createElement("div");
		barContainer.style.background = barBaseColor;
		barContainer.style.width = width;
		barContainer.style.minWidth = minWidth;
		barContainer.style.borderRadius = borderRadius;
		barContainer.style.height = height;
		barContainer.style.position = 'relative';
		this.domElement.appendChild(barContainer);

		const bar = document.createElement("div");
		bar.style.background = barColor;
		bar.style.borderRadius = borderRadius;
		bar.style.height = '100%';
		bar.style.width = '0';
		bar.style.transition = 'width 0.3s ease';  // Smooth transition
		barContainer.appendChild(bar);
		this.progressBar = bar;

		if (showPercentage) {
			const percentageLabel = document.createElement("div");
			percentageLabel.style.position = 'absolute';
			percentageLabel.style.top = '50%';
			percentageLabel.style.left = '50%';
			percentageLabel.style.transform = 'translate(-50%, -50%)';
			percentageLabel.style.color = '#fff';
			percentageLabel.style.fontSize = '14px';
			percentageLabel.style.fontFamily = 'Arial, sans-serif';
			barContainer.appendChild(percentageLabel);
			this.percentageLabel = percentageLabel;
		}

		document.body.appendChild(this.domElement);
	}

	set progress(delta) {
		const percent = Math.min(Math.max(delta * 100, 0), 100);  // Clamp between 0 and 100
		this.progressBar.style.width = `${percent}%`;
		if (this.percentageLabel) {
			this.percentageLabel.innerText = `${Math.floor(percent)}%`;
		}
	}

	set visible(value) {
		this.domElement.style.display = value ? 'flex' : 'none';
	}

	destroy() {
		this.domElement.remove();
	}
}

export { LoadingBar };
