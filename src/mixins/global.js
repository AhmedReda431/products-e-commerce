// src/mixins/global.js
export default {
    methods: {
      formatCurrency(value) {
        if (typeof value !== 'number') return value
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value)
      },
      capitalize(text) {
        if (!text) return ''
        return text.charAt(0).toUpperCase() + text.slice(1)
      }
    },
    computed: {
      isMobile() {
        return window.innerWidth <= 768
      },
      currentYear() {
        return new Date().getFullYear()
      }
    },
  }
  