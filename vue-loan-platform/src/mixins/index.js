const globalLoanPath = {
  data() {
    return {
      loan_path: ''
    }
  },
  created() {
    this.loan_path = document.location.hostname
  }
}

export { globalLoanPath }
