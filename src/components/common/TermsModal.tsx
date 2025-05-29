import React from "react";
import Modal from "./Modal";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsModal({ open, onClose }: TermsModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-6">利用規約</h2>
        <div className="prose dark:prose-invert space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">著作権</h3>
            <p>© 2025 Music Timeline. All rights reserved.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Spotify Web APIの利用について</h3>
            <p>
              本アプリケーションはSpotify Web APIを使用して公開情報を取得・表示しています。
              表示されるアーティスト情報、作品画像、音源などの権利は各権利者（Spotifyまたはアーティスト等）に帰属します。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">免責事項</h3>
            <p>
              本アプリはSpotify社とは一切関係がなく、Spotifyによって認可・承認されたものではありません。
              また、表示される情報の正確性・完全性について保証するものではありません。
              本アプリの使用により生じた損害等について、開発者はいかなる責任も負いません。
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">利用目的</h3>
            <p>本アプリは非商用目的で提供されています。</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">技術情報</h3>
            <p>
              Powered by{" "}
              <a
                href="https://developer.spotify.com/documentation/web-api/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Spotify Web API
              </a>
            </p>
          </section>
        </div>
      </div>
    </Modal>
  );
}
