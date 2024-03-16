import { resolve } from 'path';
import { readFileSync } from 'fs';

const tplFile = resolve(__dirname, 'build/release-notes.hbs');

export const branches = ['main'];
export const plugins = [
  [
    'semantic-release-gitmoji',
    {
      releaseRules: {
        patch: {
          include: [':bento:', ':arrow_up:', ':lock:'],
        },
      },
      releaseNotes: {
        template: readFileSync(tplFile, 'utf-8'),
      },
    },
  ],
  [
    '@semantic-release/npm',
    {
      npmPublish: false,
      tarballDir: 'dist',
    },
  ],
  [
    '@semantic-release/github',
    {
      assets: 'dist/*.tgz',
    },
  ],
  [
    '@semantic-release/git',
    {
      message: [
        ':bookmark: v${nextRelease.version} [skip ci]',
        '',
        'https://github.com/zhavir/portfolio-frontend/releases/tag/${nextRelease.gitTag}',
      ].join('\n'),
    },
  ],
];
