Hooks.once('init', () => {
	if(typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'ravanno-dnd5e-es',
			lang: 'es',
			dir: 'compendium'
		});
	}
});