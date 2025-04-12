import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Ultraviolet Node. All rights reserved.
            </p>
          </div>
          <div className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
            <p className="text-sm text-slate-500">
              <Link href="/privacy">
                <a className="text-slate-600 hover:text-primary transition">Privacy Policy</a>
              </Link>
              {" • "}
              <Link href="/terms">
                <a className="text-slate-600 hover:text-primary transition">Terms of Service</a>
              </Link>
              {" • "}
              <Link href="/contact">
                <a className="text-slate-600 hover:text-primary transition">Contact</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
