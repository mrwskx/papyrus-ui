# Changelog

## [0.11.0](https://github.com/mrwskx/papyrus-ui/compare/v0.10.0...v0.11.0) (2026-09-25)

### Features

- add a Refs footnote to generated PR overviews ([860a198](https://github.com/mrwskx/papyrus-ui/commit/860a19814cd87cc845cc0df3d9cc8a47c71a7485))
- add Refs footnote to generated PR overviews ([e48da7f](https://github.com/mrwskx/papyrus-ui/commit/e48da7f3b670612f01e1aea93174aadcc698b56e)), closes [#163](https://github.com/mrwskx/papyrus-ui/issues/163)
- collapse the claude workflows into one tiered claude.yml ([5ef331a](https://github.com/mrwskx/papyrus-ui/commit/5ef331a0a39d2f645528c86c41d0423d84db0935)), closes [#161](https://github.com/mrwskx/papyrus-ui/issues/161)
- enforce issue dependencies in the implement gate ([84b68c0](https://github.com/mrwskx/papyrus-ui/commit/84b68c0840fd8ec49ad278fc18b78e23b506ac7c))
- **implement:** record run outcomes back on the issue ([f07b922](https://github.com/mrwskx/papyrus-ui/commit/f07b92250e23ac2d9caf71325bcc950f26e2710f)), closes [#162](https://github.com/mrwskx/papyrus-ui/issues/162)
- record implement run outcomes back on the issue ([329bbdc](https://github.com/mrwskx/papyrus-ui/commit/329bbdcd676aec7a88e5ebd74db67225a61ef6e7))
- **release:** bump minor for pre-1.0 breaking changes ([56c6d31](https://github.com/mrwskx/papyrus-ui/commit/56c6d31afe933229aad3ac6caba72d2d4d1968e2)), closes [#156](https://github.com/mrwskx/papyrus-ui/issues/156)
- **scripts:** add agent run reporter ([324cd62](https://github.com/mrwskx/papyrus-ui/commit/324cd621e754bdf6b2e1beb3ab7892330912f232))
- **scripts:** add agent run reporter ([f52cd73](https://github.com/mrwskx/papyrus-ui/commit/f52cd733174dfb8ec2a5376c5cb0eea282ade0a8)), closes [#160](https://github.com/mrwskx/papyrus-ui/issues/160)
- **scripts:** add implement authorization gate ([1a9ff36](https://github.com/mrwskx/papyrus-ui/commit/1a9ff3628275f561655ddefa37f8d07ecd493e3f))
- **scripts:** add implement authorization gate ([9d6437b](https://github.com/mrwskx/papyrus-ui/commit/9d6437b5418528ceecdd59d4525f5a92c5cc21f0)), closes [#159](https://github.com/mrwskx/papyrus-ui/issues/159)

### Bug Fixes

- keep the converse execution log after the job ends ([8c6d0a9](https://github.com/mrwskx/papyrus-ui/commit/8c6d0a91a50ec39632c27cfc2257a89d16a971f8))
- keep the converse execution log after the job ends ([9f33126](https://github.com/mrwskx/papyrus-ui/commit/9f33126698e93d48130235bb8c148035638da137))
- pnpm banner leaks into generated PR overviews ([10f4702](https://github.com/mrwskx/papyrus-ui/commit/10f470250695188ecfa4f42ff72c99941c38bfe6))
- replace issue templates with yaml forms ([6425001](https://github.com/mrwskx/papyrus-ui/commit/642500197417faf3f87bb730226a3e34455aa88e))
- replace issue templates with yaml forms ([47be5f0](https://github.com/mrwskx/papyrus-ui/commit/47be5f0a9ac4399142cdfc7099ef390d79cfaf6a)), closes [#158](https://github.com/mrwskx/papyrus-ui/issues/158)
- report the pr tier without demanding it push ([d2a5345](https://github.com/mrwskx/papyrus-ui/commit/d2a534565771ee2ffa86c9974089e5dd4cdcb4c3))
- silence pnpm chatter in open-pr's generate-pr-description call ([8a602f1](https://github.com/mrwskx/papyrus-ui/commit/8a602f121dc69720dbacbf42795110075f6aa671))
- silence pnpm chatter in the remaining overview callers ([2b54139](https://github.com/mrwskx/papyrus-ui/commit/2b5413952cfd90112db24d647f665a33edcee79d))
- silence pnpm chatter in the remaining overview callers ([aa93414](https://github.com/mrwskx/papyrus-ui/commit/aa93414b74e480d2394412506c67e3cfcb9e5d3b))

## [0.10.0](https://github.com/mrwskx/papyrus-ui/compare/v0.9.21...v0.10.0) (2026-08-21)

### Features

- **scripts:** add validate-skills and generate-pr-description ([b713178](https://github.com/mrwskx/papyrus-ui/commit/b71317876ff27863039da8abafe48091735f3dac))
- **skills:** run implement and open-pr unattended in CI ([b5b123e](https://github.com/mrwskx/papyrus-ui/commit/b5b123ef7c63602ae436cf4af082b98173f0b3aa))
- **skills:** vendor ponytail and ponytail-review ([69e15ab](https://github.com/mrwskx/papyrus-ui/commit/69e15abb0fa135f1f33bb6413d8760f5cddd8de8))

### Bug Fixes

- **release:** fetch enough depth to amend without orphaning commits ([3b7b70f](https://github.com/mrwskx/papyrus-ui/commit/3b7b70f777915ad6022fff42414ce8277b9b527e))
- **release:** grant id-token permission for npm trusted publishing ([99e1114](https://github.com/mrwskx/papyrus-ui/commit/99e1114ada422652c3c7326955a0a7f674c60326))
- **release:** repair the release PR path under pnpm ([c00b84f](https://github.com/mrwskx/papyrus-ui/commit/c00b84fd587b4b7c7b363d756ce90745522cc50d))
- **release:** stop forwarding --yes onto git commit ([9328af6](https://github.com/mrwskx/papyrus-ui/commit/9328af693f5373c4b5008a5d5d8ca831e97500d8))
- **release:** stop forwarding --yes onto git commit ([69c1115](https://github.com/mrwskx/papyrus-ui/commit/69c1115fa2682904d0b872e17f6e9fc272d6c1b1))

### Reverts

- undo the 0.10.0/0.10.1 release version bump ([0fc3e72](https://github.com/mrwskx/papyrus-ui/commit/0fc3e724f293debe7c9eb7b88fb5387aab578963))
