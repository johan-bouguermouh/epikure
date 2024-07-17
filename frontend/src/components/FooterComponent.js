"use client";

import Image from 'next/image';
import Logo from '../../public/logo/Epikure_light.svg';
import AppStoreBadge from '../../public/download_plateforms/App_store_badge.svg';
import PlayStoreBadge from '../../public/download_plateforms/Play_store_badge.png';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function FooterComponent() {
    return (
        <footer className="bg-slate-50">
            <div className="mx-auto py-4 px-8 flex justify-between items-start w-full">
                <div className="flex space-x-10">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-black">EPIKURE</h2>
                        <ul>
                            <li><a href="#" className="text-blue-500">Nos valeurs</a></li>
                            <li><a href="#" className="text-blue-500">Nous contacter</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-black">Nos services</h2>
                        <ul>
                            <li><a href="#" className="text-blue-500">Espace Agriculteur</a></li>
                            <li><a href="#" className="text-blue-500">Espace Epikurien</a></li>
                        </ul>
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="mx-3 text-lg font-bold text-black">Télécharger EPIKURE</h2>
                    <p className="mx-3 text-black">Téléchargez l'application mobile pour accéder à tous nos services</p>
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
            <div className="bg-blue-500 text-white mx-auto p-4 flex justify-between items-center w-full">
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
                    <div className="flex space-x-4 logo-container">
                    </div>
                    <Image
                        src={Logo}
                        alt="Epikure Logo"
                        className="w-auto min-w-72 h-20 min-h-20 z-10"
                    />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex space-x-4">
                        <p><a href="#">Mentions légales</a></p>
                        <span>|</span>
                        <p><a href="#">Données personnelles</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
