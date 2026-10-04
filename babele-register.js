import {Converters} from "../babele/script/converters.js";

Hooks.once('init', () => {
	if(typeof Babele !== 'undefined') {

		console.log('***********************');
		console.log('*** Babele DnD5e ES ***');
		console.log('***********************');

		game.babele.register({
			module: 'ravanno-dnd5e-es',
			lang: 'es',
			dir: 'compendium'
		});

		const pagesConverter = Converters.pages();

		const dnd5ePages = (pages, translations, ...args) => {
			pages = pagesConverter(pages, translations, ...args);

			return pages.map(data => {
				if (!translations) {
					return data;
				}

				const translation = translations[data._id] || translations[data.name];

				if (!translation) {
					return data;
				}
				return foundry.utils.mergeObject(data, {
					system: {
						tooltip: translation.tooltip ?? data.system?.tooltip
					}
				});
			});
		};
		dnd5ePages.prepare = pagesConverter.prepare;
		dnd5ePages.extract = pagesConverter.extract;

		game.babele.registerConverters({ dnd5ePages });
	}
});
