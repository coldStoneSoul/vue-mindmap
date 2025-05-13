import { Canvas } from './canvas';
import { Tree } from '../../tree/types/tree';
import { Notebook } from '../../notebook/types/notebook';
import { ActionsManager } from './actions-manager';
import { SettingsManager } from './settings-manager';
import { EmojiManager } from '../../emoji/types/emoji-manager';
import MindmapRepo from '../repo';
import { v4 as uuidv4 } from 'uuid';

export class Mindmap {
  id: string;
  activeElement: any | null;
  canvas: Canvas;
  tree: Tree;
  notebook: Notebook;
  emoji: EmojiManager;
  actions: ActionsManager;
  settings: SettingsManager;
  repo: MindmapRepo;

  constructor() {
    this.id = uuidv4();
    this.activeElement = null;
    this.canvas = new Canvas();
    this.tree = new Tree(this);
    this.notebook = new Notebook(this);
    this.emoji = new EmojiManager(this);
    this.actions = new ActionsManager(this);
    this.settings = new SettingsManager(this);
    this.repo = new MindmapRepo(this);
  }

  setActiveElement(element: any | null) {
    this.activeElement = element;
  }

  serialize() {
    return {
      id: this.id,
      tree: this.tree.serialize(),
      notebook: this.notebook.serialize(),
    };
  }

  deserialize(data: any) {
    this.id = data.id;
    this.tree.deserialize(data.tree);
    this.notebook.deserialize(data.notebook);
  }
}