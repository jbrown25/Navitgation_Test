(function(document){
	'use strict';

	var NavMenu = {

		selectors: {
			bodyId: 'body',
			submenuMaskId: 'submenu-mask',
			navigationClass: 'navigation-container',
			navToggleClass: 'navbar-toggle',
			dropdownBtnsClass: 'dropdown-toggle',
			submenuCloseBtnsClass: 'submenu-close',
			accordionToggleBtnsClass: 'submenu-accordion-toggle'
		},

		init: function(){
			this.initSelectors();
		},

		initSelectors: function(){
			this.documentBody = document.getElementById(this.selectors.bodyId);
			this.navigation = document.getElementsByClassName(this.selectors.navigationClass)[0];
			this.navToggle = document.getElementsByClassName(this.selectors.navToggleClass)[0];
			this.dropdownBtns = document.getElementsByClassName(this.selectors.dropdownBtnsClass);
			this.submenuMask = document.getElementById(this.selectors.submenuMaskId);
			this.submenuCloseBtns = document.getElementsByClassName(this.selectors.submenuCloseBtnsClass);
			this.accordionToggleBtns = document.getElementsByClassName(this.selectors.accordionToggleBtnsClass);

			this.initNavToggle(this);
		},

		/**
		*	Navbar burger button
		*/
		initNavToggle: function(nav){
			this.navToggle.addEventListener('click', function(){
				nav.toggleNavigation();
			});

			this.initDropdowns(this);
		},

		/**
		*	Buttons that open the submenu on the right hand side
		*/
		initDropdowns: function(){
			for(var i = 0; i < this.dropdownBtns.length; i++){
				(function(index, dropdownBtns, nav){
					dropdownBtns[index].addEventListener('click', function(e){
						e.preventDefault();

						for(var j = 0; j < dropdownBtns.length; j++){
							if(j === index){
								dropdownBtns[j].classList.add('active');
							}else{
								dropdownBtns[j].classList.remove('active');
							}
						}

						nav.activateSubmenuMask();
					});
				})(i, this.dropdownBtns, this);
			}

			this.initSubmenuClose(this);
		},
		
		/**
		*	X buttons that close the submenu
		*/
		initSubmenuClose: function(nav){
			for(var i = 0; i < this.submenuCloseBtns.length; i++){
				this.submenuCloseBtns[i].addEventListener('click', function(){
					nav.closeSubmenus();
				});
			}

			this.initAccordions();
		},


		/**
		*	Accordion toggle buttons
		*/
		initAccordions: function(){
			for(var i = 0; i < this.accordionToggleBtns.length; i++){
				(function(index, accordionToggleBtns){
					accordionToggleBtns[index].addEventListener('click', function(e){
						e.preventDefault();

						//Clicking the toggle should close an open accordion
						if(accordionToggleBtns[index].classList.contains('accordion-active')){
							accordionToggleBtns[index].classList.remove('accordion-active');
							return;
						}

						for(var j = 0; j < accordionToggleBtns.length; j++){
							if(j === index){
								accordionToggleBtns[j].classList.add('accordion-active');
							}else{
								accordionToggleBtns[j].classList.remove('accordion-active');
							}
						}
					});
				})(i, this.accordionToggleBtns);
			}

			this.initSubmenuMask(this);
		},

		/**
		*	Dark overlay behind submenu.  Clicking it should close the submenu
		*/
		initSubmenuMask: function(nav){
			this.submenuMask.addEventListener('click', function(e){
				e.preventDefault();
				nav.closeSubmenus();
			});
		},


		/**
		*	Navburger functionality
		*/
		toggleNavigation: function(){
			if(this.navigation.classList.contains('navbar-open')){
				this.navigation.classList.remove('navbar-open');
				this.navToggle.classList.remove('navbar-toggle-open');
				this.documentBody.classList.remove('body-menu-open');
				
				this.closeSubmenus();
			}else{
				this.navigation.classList.add('navbar-open');
				this.navToggle.classList.add('navbar-toggle-open');
				this.documentBody.classList.add('body-menu-open');
			}
		},

		activateSubmenuMask: function(){
			this.submenuMask.classList.add('mask-active');
		},

		deactivateSubmenuMask: function(){
			this.submenuMask.classList.remove('mask-active');
		},

		isSubmenuOpen: function(){
			for(var i = 0; i < this.dropdownBtns.length; i++){
				if(this.dropdownBtns[i].classList.contains('active')) return true;
			}
			return false;
		},

		closeSubmenus: function(){
			for(var i = 0; i < this.dropdownBtns.length; i++){
				this.dropdownBtns[i].classList.remove('active');
			}
			this.deactivateSubmenuMask();
		}
	};

	NavMenu.init();

})(document);