import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="border border-gray-300 text-black py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            <h3 className="font-bold text-xl mb-4">Resources</h3>
            <ul className="list-none space-y-3">
              <li><span className="hover:text-gray-300 cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-gray-300 cursor-pointer">Policy</span></li>
              <li><span className="hover:text-gray-300 cursor-pointer">Career</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Company</h3>
            <ul className="list-none space-y-3">
              <li><span className="hover:text-gray-300 cursor-pointer">About Us</span></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><span className="hover:text-gray-300 cursor-pointer">Terms Of Use</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Follow Us</h3>
            <ul className="list-none space-y-3">
              <li>
                <span className="hover:text-gray-300 flex items-center cursor-pointer">
                  <FaFacebookF className="mr-2" /> Facebook
                </span>
              </li>
              <li>
                <span className="hover:text-gray-300 flex items-center cursor-pointer">
                  <FaTwitter className="mr-2" /> Twitter
                </span>
              </li>
              <li>
                <span className="hover:text-gray-300 flex items-center cursor-pointer">
                  <FaInstagram className="mr-2" /> Instagram
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-4">Newsletter</h4>
            <input 
              type="email" 
              className="mt-3 p-2 rounded w-full border border-gray-400" 
              placeholder="example123@something.com" 
            />
            <button className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-700 font-semibold py-2 px-7 rounded mt-2 w-full">Subscribe</button>
          </div>

        </div>
        <div className="mt-10 border-t border-gray-300 pt-5 flex justify-center">
            <p>&copy; {new Date().getFullYear()} Holidaze. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
