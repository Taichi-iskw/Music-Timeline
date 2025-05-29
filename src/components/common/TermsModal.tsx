"use client";

import React from "react";
import Modal from "./Modal";
import { useLanguage } from "@/hooks/use-language";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ open, onClose }: TermsModalProps) {
  const { language } = useLanguage();

  const content = {
    ja: {
      title: "利用規約",
      sections: [
        {
          title: "著作権",
          content: "© 2025 Music Timeline. All rights reserved.",
        },
        {
          title: "Spotify Web APIの利用について",
          content:
            "本アプリケーションはSpotify Web APIを使用して公開情報を取得・表示しています。表示されるアーティスト情報、作品画像、音源などの権利は各権利者（Spotifyまたはアーティスト等）に帰属します。",
        },
        {
          title: "免責事項",
          content:
            "本アプリはSpotify社とは一切関係がなく、Spotifyによって認可・承認されたものではありません。また、表示される情報の正確性・完全性について保証するものではありません。本アプリの使用により生じた損害等について、開発者はいかなる責任も負いません。",
        },
        {
          title: "利用目的",
          content: "本アプリは非商用目的で提供されています。",
        },
        {
          title: "技術情報",
          content: "Powered by Spotify Web API",
        },
      ],
    },
    en: {
      title: "Terms of Service",
      sections: [
        {
          title: "Copyright",
          content: "© 2025 Music Timeline. All rights reserved.",
        },
        {
          title: "Spotify Web API Usage",
          content:
            "This application uses the Spotify Web API to retrieve and display publicly available data. All rights to artist information, album artwork, and audio belong to their respective rights holders (Spotify or the artists).",
        },
        {
          title: "Disclaimer",
          content:
            "This app is not affiliated with, endorsed, or certified by Spotify. The developer makes no guarantees about the accuracy or completeness of the information displayed. The developer is not liable for any damages resulting from the use of this app.",
        },
        {
          title: "Usage Purpose",
          content: "This application is provided for non-commercial use only.",
        },
        {
          title: "Technical Information",
          content: "Powered by Spotify Web API",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-6">{currentContent.title}</h2>
        <div className="prose dark:prose-invert space-y-6">
          {currentContent.sections.map((section, index) => (
            <section key={index}>
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p>
                {section.title === "技術情報" || section.title === "Technical Information" ? (
                  <>
                    Powered by{" "}
                    <a
                      href="https://developer.spotify.com/documentation/web-api/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Spotify Web API
                    </a>
                  </>
                ) : (
                  section.content
                )}
              </p>
            </section>
          ))}
        </div>
      </div>
    </Modal>
  );
}
