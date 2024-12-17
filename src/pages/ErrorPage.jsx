import React, { Component } from "react";
import FullErrorPage from "./FullErrorPage"; 

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate error
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log the error and info for debugging
    console.log("Error caught in boundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error is caught
      return <FullErrorPage error={this.state.error} />;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
