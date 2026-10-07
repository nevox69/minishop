import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(err, errinfo) {
    console.log("ErrorBoundary caught:", err, errinfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
            <p className="text-gray-400">Try refreshing the page.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
