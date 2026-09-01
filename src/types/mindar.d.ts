declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  // Three.jsの型をインポート
  import type { WebGLRenderer, Scene, PerspectiveCamera, Group } from 'three';

  // コンストラクタに渡すオプションの型定義
  export interface MindARThreeOptions {
    container: HTMLElement | null;
    imageTargetSrc: string;
    maxTrack?: number;
    uiLoading?: string;
    uiScanning?: string;
    uiError?: string;
    filterMinCF?: number;
    filterBeta?: number;
  }

  // Anchor（トラッキング対象）の型定義
  export interface MindARAnchor {
    group: Group;
    targetIndex: number;
    onTargetFound?: () => void;
    onTargetLost?: () => void;
  }

  // MindARThree クラス本体の型定義
  export class MindARThree {
    constructor(options: MindARThreeOptions);

    // プロパティ
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;

    // メソッド
    start(): Promise<void>;
    stop(): void;
    addAnchor(targetIndex: number): MindARAnchor;
  }
}