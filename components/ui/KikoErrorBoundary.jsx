import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class KikoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Kiko Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center border-4 border-teal-100 relative overflow-hidden">
            {/* Kiko Animation Placeholder */}
            <div className="w-32 h-32 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-6 relative">
              <span className="text-6xl">🤖</span>
              <div className="absolute -bottom-2 -right-2 bg-amber-400 p-2 rounded-full rotate-12 shadow-sm">
                <AlertTriangle size={24} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-800 mb-2 font-display">Wah, ada mesin yang tersangkut!</h1>
            <p className="text-slate-600 mb-6 font-body">
              Kiko sedang mencoba memperbaikinya dengan kunci inggris ajaib. Jangan khawatir, klik tombol di bawah untuk mencoba lagi ya!
            </p>
            
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              <span>Coba Lagi Sekarang</span>
            </button>
            
            <div className="mt-6 text-xs text-slate-400 font-mono text-left bg-slate-100 p-3 rounded-lg overflow-x-auto">
              Kode Rahasia Teknisi:<br/>
              <span className="text-red-400">{this.state.errorInfo}</span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
