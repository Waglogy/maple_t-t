"use client"

import Image from "next/image"
import { useState } from "react"

export default function AdventureGrid() {
  const [expanded, setExpanded] = useState(Array(6).fill(false));

  const toggleExpand = (index: number) => {
    setExpanded(prev => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="container mx-auto p-4 w-full  ">
      <div className="text-center mb-8 mt-8">
        <h2 className="text-3xl font-bold">
          Sikkim: An <span className="text-[#f45201]">Adventure Paradise</span>
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover the untamed beauty of Sikkim, where every trail leads to
          adventure and every moment creates lasting memories. From towering
          peaks to hidden valleys, experience nature at its finest.
        </p>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-4 p-4 w-[90vw] h-[90vh]  rounded-lg">
        {/* Sidebar Left */}
        <div className="relative row-span-4 bg-gray-800 rounded-lg">
          <Image
            src="/mountb.jpg" // Replace with your image path
            alt="Sidebar Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>

        {/* Top Bar */}
        <div className="relative col-span-2 bg-gray-800 rounded-lg">
          <Image
            src="/camping.jpg" // Replace with your image path
            alt="Top Bar Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center flex-col justify-center">
            <h3 className=" hidden md:block text-[#f45201] text-xl font-bold">CAMPING</h3>
            <p className=" hidden md:block text-white text-sm">
              Fambangla Wild Life Sanctury, Ranke, Mastars, Yekteee, Yalli,
              Rolep
            </p>
          </div>
        </div>

        {/* Sidebar Right */}
        <div className="relative row-span-4 bg-gray-800 rounded-lg">
          <Image
            src="/tra.jpg" // Replace with your image path
            alt="Sidebar Right Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center  flex-col justify-center"></div>
        </div>

        {/* Main Content */}
        <div className="relative row-span-2 col-span-2 bg-gray-800 rounded-lg">
          <Image
            src="/plesent.jpg" // Replace with your image path
            alt="Main Content Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className=" hidden md:block text-[#f45201] text-xl font-bold">BIRD WATCHING</h3>
            <p className=" hidden md:block text-white text-sm">
              Chaya Tal, Uttrey, Kochepalast, Rinchapang, Varsey
            </p>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="relative bg-gray-800 rounded-lg">
          <Image
            src="/para.jpg" // Replace with your image path
            alt="Bottom Section Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className=" hidden md:block text-[#f45201] text-xl font-bold">PARAGLIDING</h3>
            <p className="hidden md:block text-white text-sm">
              Rasko,Reshithang near Gangtok,Pelling
            </p>
          </div>
        </div>
        <div className="relative bg-gray-800 rounded-lg">
          <Image
            src="/trek.jpg" // Replace with your image path
            alt="Bottom Section Image"
            layout="fill"
            className="object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className=" hidden md:block text-[#f45201] text-xl font-bold"> TREKKING </h3>
            <p className="hidden md:block text-white text-sm">
              Dzongri, Singalila Trek, Khadi, Tear Jurry
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg"></div>
        <div className="bg-gray-800 rounded-lg"></div>
        <div className="bg-gray-800 rounded-lg"></div>
        <div className="bg-gray-800 rounded-lg"></div>
        <div className="bg-gray-800 rounded-lg"></div>
      </div>
      <div className="mt-12 mb-8 mx-auto max-w-4xl">
        <div
          className="border-2 border-[#f45201] rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
          onClick={() => toggleExpand(0)}
        >
          <div className="flex items-center justify-between">
            <h3 className=" text-2xl font-semibold text-[#f45201]">
              Adventure Activities in Sikkim
            </h3>
            <span
              className={`transform transition-transform duration-300 ${
                expanded[0] ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {!expanded[0] ? (
            <p className="mt-2 text-gray-600">
              Click to explore the diverse adventure activities across Sikkim
              regions...
            </p>
          ) : (
            <div className="mt-4 space-y-6 text-gray-700">
              <div>
                <h4 className="font-semibold text-lg mb-2">East Sikkim</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Trekking:</span> Jhandi Dara,
                    Pangalakho, Gedi Budeng, Khadi, Tear Jurry
                  </li>
                  <li>
                    <span className="font-medium">
                      Village Tourism & Homestay:
                    </span>{" "}
                    Yol Village, Teckteen, Alpine Homestay Pakyang and Karbok,
                    Ray Minda, Aritar, Padanichen, Zuluk, Gnathong, Tumeen
                    Lingee, Rakdong
                  </li>
                  <li>
                    <span className="font-medium">Paragliding:</span> Rasko,
                    Reshithang near Gangtok
                  </li>
                  <li>
                    <span className="font-medium">Mountain Biking:</span>{" "}
                    Gangtok, Renko, Ruantek, Shuruk, Paibuik Naitam,
                    Assamlingey, Pakyang, Changalake, Gnathang, Kapuk, Lingham,
                    Zuluk Phadenshen, Rangli, Artter
                  </li>
                  <li>
                    <span className="font-medium">Camping:</span> Fambangla Wild
                    Life Sanctury, Ranke, Mastars, Yekteee, Yalli, Rolep
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">West Sikkim</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Trekking:</span> Varsey,
                    Yoksum, Dzongri, Singalila Trek
                  </li>
                  <li>
                    <span className="font-medium">Monastery Trek:</span>{" "}
                    Pelling, Pemayangtshe, Kechapelari, Fuksam, Tashiding
                  </li>
                  <li>
                    <span className="font-medium">Bird Watching:</span> Chaya
                    Tal, Uttrey, Kochepalast, Rinchapang, Varsey
                  </li>
                  <li>
                    <span className="font-medium">
                      Village Tourism & Homestay:
                    </span>{" "}
                    Fashiding, Chongrang, Kechopalari, Darep, Noko Chumbung,
                    Ulerecy, Hee, Bermoil, Rinchenpang, Sereng, Chakang,
                    Okberty, Hilley, Durandin
                  </li>
                  <li>
                    <span className="font-medium">Wellness Tourism:</span> Hot
                    Water Spring Reshi (Phur Tika Tshe)
                  </li>
                  <li>
                    <span className="font-medium">Paragliding:</span> Pelling
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">North Sikkim</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Trekking:</span> Green Loke,
                    Toshar Lake, Singba Rhododendron Sanctory
                  </li>
                  <li>
                    <span className="font-medium">
                      Village Tourism & Homestay:
                    </span>{" "}
                    Dzongu, Passingding, Sankalang, Lochang, Lachen, Kabi,
                    Tinchim
                  </li>
                  <li>
                    <span className="font-medium">Mountain Biking:</span>{" "}
                    Gongtek Kobi-Phodang-Mangan to Lachen-Lachung-Yunthang
                  </li>
                  <li>
                    <span className="font-medium">Wellness Tourism:</span>{" "}
                    Hotwater Spring of Yunshang, Lingthen
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">South Sikkim</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-medium">Trekking:</span> Tendon,
                    Mainces, Bhaleydhunga
                  </li>
                  <li>
                    <span className="font-medium">Camping:</span> Chemchay,
                    Tendong, Mainam, Bhaleydhunga
                  </li>
                  <li>
                    <span className="font-medium">Mountain Biking:</span>{" "}
                    Namithang to Moniram to Torey Bhir, Sadam & Ravangla
                    Chemchey, Denthang Namchi, Jorethang
                  </li>
                  <li>
                    <span className="font-medium">
                      Village Tourism & Homestay:
                    </span>{" "}
                    Kewzing, Rulong, Salep, Joubert, Temi, Chalsenthang, Manry
                    Bhanjyang, Sadam, Chemchey, Manithang
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
