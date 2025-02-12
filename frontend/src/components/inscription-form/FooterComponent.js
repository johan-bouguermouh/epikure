"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import AppStoreBadge from "../../../public/download_plateforms/App_store_badge.svg";
import PlayStoreBadge from "../../../public/download_plateforms/Play_store_badge.png";
import Logo from "../../../public/logo/Epikure_light.svg";

function FooterComponent() {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto py-4 px-8 flex justify-between items-start w-full">
        <div className="flex space-x-10">
          <div className="space-y-4">
            <h4>EPIKURE</h4>
            <ul>
              <li>
                <a href="#">Nos valeurs</a>
              </li>
              <li>
                <a href="#">Nous contacter</a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4>Nos services</h4>
            <ul>
              <li>
                <a href="#">Espace Agriculteur</a>
              </li>
              <li>
                <a href="#">Espace Epikurien</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h4>Télécharger EPIKURE</h4>
          <p className="mx-3 text-black">
            Téléchargez l'application mobile pour accéder à tous nos services
          </p>
          <div className="flex justify-start space-x-4">
            <a href="https://apps.apple.com">
              <Image
                src={AppStoreBadge}
                alt="Download on the App Store"
                className="m-3 w-auto h-12 min-h-12"
              />
            </a>
            <a href="https://play.google.com">
              <Image
                src={PlayStoreBadge}
                alt="Get it on Google Play"
                className="m-3 w-auto h-12 min-h-12"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-secondary/400 text-white mx-auto p-4 flex justify-between items-center w-full">
        <div className="flex-1 flex justify-center">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook">
                <Facebook className="w-h-6 h-6" />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <Twitter className="w-h-6 h-6" />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <Instagram className="w-h-6 h-6" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="w-h-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
          <div className="flex space-x-4 logo-container"></div>
          <Image
            src={Logo}
            alt="Epikure Logo"
            className="w-auto min-w-72 h-20 min-h-20 z-10"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-4">
            <p>
              <a href="#">Mentions légales</a>
            </p>
            <span>|</span>
            <p>
              <a href="#">Données personnelles</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
