class MouseParallax {
    constructor(elements, strength = 10, easing = 0.1) {
        this.elements = elements;
        this.strength = strength;
        this.easing = easing;
        this.targetPositions = {};

        document.addEventListener("mousemove", this.updateTargetPositions.bind(this));
        this.animateParallax();
    }

    /**
    * Update the target positions of the elements based on the mouse position
    */
    updateTargetPositions(event) {
        this.elements.forEach((shift) => {
        const position = shift.getAttribute("strength") ?? this.strength;
        const strength = parseFloat(position);

        this.targetPositions[shift] = {
            x: (window.innerWidth / 2 - event.pageX) * strength / 100,
            y: (window.innerHeight / 2 - event.pageY) * strength / 100,
        };
        });
    }

    /**
    * Animate the parallax effect
    */
    animateParallax() {
        this.elements.forEach((shift) => {
            const target = this.targetPositions[shift];
            if (!target) return;

            const matrix = new DOMMatrix(getComputedStyle(shift).transform);
            const currentX = matrix.m41;
            const currentY = matrix.m42;

            const newX = currentX + (target.x - currentX) * this.easing;
            const newY = currentY + (target.y - currentY) * this.easing;

            shift.style.transform = `translate(${newX}px, ${newY}px)`;
        });
        requestAnimationFrame(this.animateParallax.bind(this));
    }
}

new MouseParallax(document.querySelectorAll(".mouse-parallax"));
