# Changelog

## [0.12.0](https://github.com/mrwskx/papyrus-ui/compare/v0.11.0...v0.12.0) (2026-11-21)


### ⚠ BREAKING CHANGES

* split shared radius/shadow roles into per-component tokens
* name shared radius/shadow roles by purpose, not by one owner
* rename shadow/radius roles after the components that use them
* the papyrus-ui/plugin entry is gone.
* Papyrus UI requires Tailwind 4. The peer range is now tailwindcss ^4; apps on Tailwind 3 must upgrade to Tailwind 4 or stay on the last release that supports Tailwind 3.
* drops the CommonJS build; consumers must use import, or require() on Node 20.19+/22.12+ which load a synchronous ESM graph unflagged

### Features

* add radius and shadow tokens ([692ee35](https://github.com/mrwskx/papyrus-ui/commit/692ee358ffda51e71d02ec9b1bc743bf7225077b))
* add radius and shadow tokens ([09f7201](https://github.com/mrwskx/papyrus-ui/commit/09f720119e19bfedb319498815af59bdca703ecf))
* add the color token layer with the muted cobalt palette ([2dba934](https://github.com/mrwskx/papyrus-ui/commit/2dba93468fd2e55c9af52f46c0b132eab372aab3))
* add the color token layer with the muted cobalt palette ([b451df5](https://github.com/mrwskx/papyrus-ui/commit/b451df5d184bd2c61f58feb48158d4141084d2aa))
* drop Tailwind 3 support and its workarounds ([17c830d](https://github.com/mrwskx/papyrus-ui/commit/17c830d325717d4ceff89652ec23d204ed0a9854))
* match Tailwind 3 rendering on Tailwind 4 ([bb751b4](https://github.com/mrwskx/papyrus-ui/commit/bb751b4d5d4217168821282d502a8c318db08371)), closes [#221](https://github.com/mrwskx/papyrus-ui/issues/221)
* portaled overlays take the opener's theme scope ([428e624](https://github.com/mrwskx/papyrus-ui/commit/428e6241c2e2ce3a8e8a669e7a358dbdfd676596)), closes [#223](https://github.com/mrwskx/papyrus-ui/issues/223)
* portaled overlays take the theme scope of the element that opens them ([580ee9b](https://github.com/mrwskx/papyrus-ui/commit/580ee9bb9144b948ca32785d243ed200251ad833))
* refine the logo with a tracking-error bar ([8e190d6](https://github.com/mrwskx/papyrus-ui/commit/8e190d6eb8d626fe360a9c6b1761739dc7cd67da))
* refine the logo with a tracking-error bar ([e57c3d6](https://github.com/mrwskx/papyrus-ui/commit/e57c3d607efbb0348fc7da097ef3348aa5259306)), closes [#225](https://github.com/mrwskx/papyrus-ui/issues/225)
* ship papyrus-ui as esm only ([3a8c19e](https://github.com/mrwskx/papyrus-ui/commit/3a8c19e3654facb1fdfc9671777be9bf74e8d65b))
* ship papyrus-ui as ESM only ([e18faaf](https://github.com/mrwskx/papyrus-ui/commit/e18faaf29b62fed82d9d85a6ee142074be2d9ab1))
* ship the theme as Tailwind 4 CSS instead of a JavaScript plugin ([debdbcf](https://github.com/mrwskx/papyrus-ui/commit/debdbcf3652c994c595551eb581e4b5711de3a7e))
* vendor the impeccable design skill ([9f04744](https://github.com/mrwskx/papyrus-ui/commit/9f04744732719b983aad9c547332d50a168ef4ee))


### Bug Fixes

* correct README Tailwind setup to use plugins/[@plugin](https://github.com/plugin), not presets ([2f93cc7](https://github.com/mrwskx/papyrus-ui/commit/2f93cc7f8e5abecf5dc2cdb6a23b4600a90ac4e0))
* merge className and style on dropdown and menu-bar content ([cb5d2ee](https://github.com/mrwskx/papyrus-ui/commit/cb5d2eec5a4b201471a9ee35a875f4a49f2c55f3)), closes [#222](https://github.com/mrwskx/papyrus-ui/issues/222)
* restore caller style/contentStyle merge on portaled content ([3d50a42](https://github.com/mrwskx/papyrus-ui/commit/3d50a42ac9b77699f3a3fc6e53d4b57c70602641))


### Code Refactoring

* name shared radius/shadow roles by purpose, not by one owner ([20537dc](https://github.com/mrwskx/papyrus-ui/commit/20537dcc33f96974e7e124eb56026c5bac2d170e))
* rename shadow/radius roles after the components that use them ([817ec2b](https://github.com/mrwskx/papyrus-ui/commit/817ec2bdd492ff79ebc39f2308062c23ee88aa7b)), closes [#227](https://github.com/mrwskx/papyrus-ui/issues/227)
* split shared radius/shadow roles into per-component tokens ([fa88a21](https://github.com/mrwskx/papyrus-ui/commit/fa88a214f34ca47d68d60cba87d47cd1c8d81332))

## [0.11.0](https://github.com/mrwskx/papyrus-ui/compare/v0.10.0...v0.11.0) (2026-09-29)

### Features

- add Refs footnote to generated PR overviews ([e48da7f](https://github.com/mrwskx/papyrus-ui/commit/e48da7f3b670612f01e1aea93174aadcc698b56e)), closes [#163](https://github.com/mrwskx/papyrus-ui/issues/163)
- collapse the claude workflows into one tiered claude.yml ([5ef331a](https://github.com/mrwskx/papyrus-ui/commit/5ef331a0a39d2f645528c86c41d0423d84db0935)), closes [#161](https://github.com/mrwskx/papyrus-ui/issues/161)
- enforce issue dependencies in the implement gate ([84b68c0](https://github.com/mrwskx/papyrus-ui/commit/84b68c0840fd8ec49ad278fc18b78e23b506ac7c))
- **implement:** record run outcomes back on the issue ([f07b922](https://github.com/mrwskx/papyrus-ui/commit/f07b92250e23ac2d9caf71325bcc950f26e2710f)), closes [#162](https://github.com/mrwskx/papyrus-ui/issues/162)
- **release:** bump minor for pre-1.0 breaking changes ([56c6d31](https://github.com/mrwskx/papyrus-ui/commit/56c6d31afe933229aad3ac6caba72d2d4d1968e2)), closes [#156](https://github.com/mrwskx/papyrus-ui/issues/156)
- **scripts:** add agent run reporter ([f52cd73](https://github.com/mrwskx/papyrus-ui/commit/f52cd733174dfb8ec2a5376c5cb0eea282ade0a8)), closes [#160](https://github.com/mrwskx/papyrus-ui/issues/160)
- **scripts:** add implement authorization gate ([9d6437b](https://github.com/mrwskx/papyrus-ui/commit/9d6437b5418528ceecdd59d4525f5a92c5cc21f0)), closes [#159](https://github.com/mrwskx/papyrus-ui/issues/159)
- **validate-skills:** enforce skills-lock.json v2 ([8b7394c](https://github.com/mrwskx/papyrus-ui/commit/8b7394cde6badaec372291d1fc49209d47bfdf6f))

### Bug Fixes

- derive controlled state in render instead of syncing in effects ([f57b2dd](https://github.com/mrwskx/papyrus-ui/commit/f57b2dd260df8eb7ffd9f2211bde46a8ebf4f180))
- gate the pr tier on fork pull requests ([f6db433](https://github.com/mrwskx/papyrus-ui/commit/f6db4335d4ed4a280b184f1537a861b566921a99))
- keep the converse execution log after the job ends ([9f33126](https://github.com/mrwskx/papyrus-ui/commit/9f33126698e93d48130235bb8c148035638da137))
- pnpm banner leaks into generated PR overviews ([10f4702](https://github.com/mrwskx/papyrus-ui/commit/10f470250695188ecfa4f42ff72c99941c38bfe6))
- replace issue templates with yaml forms ([47be5f0](https://github.com/mrwskx/papyrus-ui/commit/47be5f0a9ac4399142cdfc7099ef390d79cfaf6a)), closes [#158](https://github.com/mrwskx/papyrus-ui/issues/158)
- report the pr tier without demanding it push ([d2a5345](https://github.com/mrwskx/papyrus-ui/commit/d2a534565771ee2ffa86c9974089e5dd4cdcb4c3))
- silence pnpm chatter in open-pr's generate-pr-description call ([8a602f1](https://github.com/mrwskx/papyrus-ui/commit/8a602f121dc69720dbacbf42795110075f6aa671))
- silence pnpm chatter in the remaining overview callers ([aa93414](https://github.com/mrwskx/papyrus-ui/commit/aa93414b74e480d2394412506c67e3cfcb9e5d3b))
- **skills:** resolve issue refs on agent branches ([71b605a](https://github.com/mrwskx/papyrus-ui/commit/71b605a47fd179f3598ed1c50bbf32085f59be22)), closes [#167](https://github.com/mrwskx/papyrus-ui/issues/167)

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
