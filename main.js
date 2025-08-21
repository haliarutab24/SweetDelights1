// main.js - Improved JavaScript for Sweet Delights Cake Shop

document.addEventListener('DOMContentLoaded', function() {
    try {
      // ========== Global Variables ==========
      let currentTestimonial = 0;
      const cartCount = localStorage.getItem('cartCount') || 0;
      
      // ========== DOM Elements ==========
      const hamburger = document.querySelector('.hamburger');
      const navLinks = document.querySelector('.nav-links');
      const navbar = document.querySelector('.navbar');
      const cartCountElement = document.querySelector('.cart-count');
      
      // ========== Initialize Cart Count ==========
      if (cartCountElement) {
        cartCountElement.textContent = cartCount;
      }
  
      // ========== Mobile Navigation Toggle ==========
      if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
          this.classList.toggle('active');
          navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
          });
        });
      }
  
      // ========== Sticky Navigation on Scroll ==========
      if (navbar) {
        window.addEventListener('scroll', function() {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
      }
  
      // ========== Testimonial Slider ==========
      const initTestimonialSlider = () => {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (!testimonials.length || !prevBtn || !nextBtn) return;
        
        const showTestimonial = (index) => {
          testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
          });
          testimonials[index].classList.add('active');
        };
  
        prevBtn.addEventListener('click', function() {
          currentTestimonial--;
          if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
          }
          showTestimonial(currentTestimonial);
        });
  
        nextBtn.addEventListener('click', function() {
          currentTestimonial++;
          if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
          }
          showTestimonial(currentTestimonial);
        });
  
        // Auto-rotate testimonials
        const testimonialInterval = setInterval(() => {
          currentTestimonial++;
          if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
          }
          showTestimonial(currentTestimonial);
        }, 5000);
  
        // Cleanup interval when leaving page
        window.addEventListener('beforeunload', () => {
          clearInterval(testimonialInterval);
        });
      };
      initTestimonialSlider();
  
      // ========== Cake Filtering on Categories Page ==========
      const initCategoryFilter = () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const cakeItems = document.querySelectorAll('.cake-card');
        
        if (!filterButtons.length || !cakeItems.length) return;
        
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter') || 'all';
            
            cakeItems.forEach(item => {
              if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          });
        });
      };
      initCategoryFilter();
  
      // ========== Cake Search Functionality ==========
      const initSearchFunctionality = () => {
        const searchInput = document.getElementById('searchInput');
        const cakeItems = document.querySelectorAll('.cake-card');
        
        if (!searchInput || !cakeItems.length) return;
        
        searchInput.addEventListener('keyup', function() {
          const searchTerm = this.value.toLowerCase().trim();
          
          cakeItems.forEach(item => {
            const cakeName = item.querySelector('h3')?.textContent.toLowerCase() || '';
            if (cakeName.includes(searchTerm)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      };
      initSearchFunctionality();
  
      // ========== Cake Modal Functionality ==========
      const initCakeModal = () => {
        const cakeCards = document.querySelectorAll('.cake-card');
        const modal = document.getElementById('cakeModal');
        const closeModal = document.querySelector('.close-modal');
        
        if (!cakeCards.length || !modal || !closeModal) return;
        
        const openModal = (card) => {
          try {
            const cakeImg = card.querySelector('img')?.src || '';
            const cakeTitle = card.querySelector('h3')?.textContent || 'Untitled';
            const cakePrice = card.querySelector('.price')?.textContent || '$0';
            const cakeDesc = card.querySelector('p')?.textContent || 'No description available';
            
            document.querySelector('.modal-img img').src = cakeImg;
            document.querySelector('.modal-info h2').textContent = cakeTitle;
            document.querySelector('.modal-info .price').textContent = cakePrice;
            document.querySelector('.modal-info p').textContent = cakeDesc;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
          } catch (error) {
            console.error('Error opening modal:', error);
          }
        };
  
        cakeCards.forEach(card => {
          card.addEventListener('click', function(e) {
            // Don't open modal if clicking the add-to-cart button
            if (!e.target.classList.contains('add-to-cart') && 
                !e.target.closest('.add-to-cart')) {
              openModal(this);
            }
          });
        });
  
        closeModal.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
  
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
          }
        });
      };
      initCakeModal();
  
      // ========== Add to Cart Functionality ==========
      const initAddToCart = () => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        if (!addToCartButtons.length || !cartCountElement) return;
        
        const updateCartCount = (count) => {
          cartCountElement.textContent = count;
          localStorage.setItem('cartCount', count);
        };
  
        addToCartButtons.forEach(button => {
          button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent click events
            
            let count = parseInt(cartCountElement.textContent) || 0;
            count++;
            updateCartCount(count);
            
            // Add animation
            this.classList.add('added');
            setTimeout(() => {
              this.classList.remove('added');
            }, 1000);
          });
        });
      };
      initAddToCart();
  
      // ========== FAQ Accordion ==========
      const initFAQAccordion = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (!faqQuestions.length) return;
        
        faqQuestions.forEach(question => {
          question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.style.maxHeight) {
              answer.style.maxHeight = null;
            } else {
              answer.style.maxHeight = answer.scrollHeight + 'px';
            }
          });
        });
      };
      initFAQAccordion();
  
      // ========== Gallery Lightbox ==========
      const initGalleryLightbox = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryModal = document.querySelector('.gallery-modal');
        const closeGallery = document.querySelector('.close-gallery');
        
        if (!galleryItems.length || !galleryModal || !closeGallery) return;
        
        galleryItems.forEach(item => {
          item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt || '';
            
            document.querySelector('.gallery-modal-content').src = imgSrc;
            document.querySelector('.caption').textContent = imgAlt;
            galleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
          });
        });
  
        closeGallery.addEventListener('click', function() {
          galleryModal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
  
        window.addEventListener('click', function(e) {
          if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
          }
        });
      };
      initGalleryLightbox();
  
      // ========== Form Submissions ==========
      const initForms = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
              if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
              } else {
                input.style.borderColor = '';
              }
            });
            
            if (isValid) {
              // In a real app, you would send this to a server
              console.log('Form submitted:', this.id);
              alert('Thank you for your message! We will get back to you soon.');
              this.reset();
            } else {
              alert('Please fill in all required fields.');
            }
          });
        });
      };
      initForms();
  
    } catch (error) {
      console.error('An error occurred in the main script:', error);
    }
  });
  
  // ========== Utility Functions ==========
  function debounce(func, wait = 100) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }
  // Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});