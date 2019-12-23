const ViewHandler = {
    scrollCounter: 0,
    progressBar: null,
    currentStep: 1,

    init: function() {
        const self = this;
        $('document').ready(function(){
            self.setListeners();
        });
    },

    getStep: function() {
        return this.currentStep;
    },

    setStep: function(step) {
        this.currentStep = step;
    },

    setListeners: function() {
        this.showPage();
        this.scene1();
        this.scene2();
        this.scene3();
    },

    showPage: function() {
        let body = document.querySelector('body');
        setTimeout(() => {
            body.style.visibility = 'visible';
        }, 200);
        setTimeout(() => {
            body.classList.add('loaded');    
        }, 400);
    },

    setupProgressBar: function() {
        this.progressBar = new ProgressBar.Circle("#progress-bar", {
            color: '#10cc38',
            strokeWidth: 1,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#24c721', width: 1 },
            to: { color: '#d81a1a', width: 1 },

            // Set default step function for all animate calls
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
            }
        });
    },

    scene1: function() {
        this.setupProgressBar();

        document.addEventListener('wheel', (e) => {this.onScene1Scroll(e); });
        document.addEventListener('mousewheel', (e) => {this.onScene1Scroll(e); });
        document.addEventListener('DOMMouseScroll', (e) => {this.onScene1Scroll(e); });
    },

    onScene1Scroll: function(ev) {
        if(ev.wheelDelta <= 0) {
            this.scrollCounter = this.scrollCounter+1;
            this.updateProgressBar();
        }
    },

    checkScrollValue: function() {
        if(this.scrollCounter < 100) return false;

        let scene1 = document.querySelector('.scene1');
        let scene2 = document.querySelector('.scene2');

        scene1.classList.add('scene-hidden');
        scene2.classList.remove('scene-hidden');

        this.setStep(2);
    },
    
    updateProgressBar: function() {
        let counter = this.scrollCounter;
        if(this.getStep() != 1) return false;

        if(counter > 100) {
            // TODO: Improve by event listener on progressBar ended
            setTimeout(() => {
                this.checkScrollValue();
            }, 1500);
        } else {
            let valueFormatted = counter / 100;
            
            // TODO: Review console.error
            // https://github.com/kimmobrunfeldt/progressbar.js/issues/255
            // not affecting to UI
            this.progressBar.animate(valueFormatted);
        }
    },


    scene2: function() {
        let nextActionBtn = document.querySelector('#next-action');
        nextActionBtn.addEventListener('click', ({e}) => {this.onScene2NextClick({e}); });
    },

    onScene2NextClick: function() {
        let body = document.querySelector('body');
        let scene2 = document.querySelector('.scene2');
        let scene3 = document.querySelector('.scene3');

        scene2.classList.add('scene-hidden');
        scene3.classList.remove('scene-hidden');
        body.classList.remove('fixed');

        this.setStep(3);
    },


    scene3: function() {
        let rellax = new Rellax('.parallax-img', {});

        let equippedBtn = document.querySelector('#equipped-btn');
        let unequippedBtn = document.querySelector('#unequipped-btn');

        equippedBtn.addEventListener('click', ({e}) => {this.onScene3EquippedClick({e}); });
        unequippedBtn.addEventListener('click', ({e}) => {this.onScene3UnequippedClick({e}); });

    },

    onScene3EquippedClick: function(e) {
        $('.circle-btn').removeClass('circle-btn-active');
        let equippedBtn = document.querySelector('#equipped-btn');
        equippedBtn.classList.add('circle-btn-active');
        $(equippedBtn).closest('article').removeClass('bg-unequipped');
        $(equippedBtn).closest('article').addClass('bg-equipped');
    },

    onScene3UnequippedClick: function(e) {
        $('.circle-btn').removeClass('circle-btn-active');
        let unequippedBtn = document.querySelector('#unequipped-btn');
        unequippedBtn.classList.add('circle-btn-active');
        $(unequippedBtn).closest('article').removeClass('bg-equipped');
        $(unequippedBtn).closest('article').addClass('bg-unequipped');
    }

    
};

module.exports = ViewHandler;