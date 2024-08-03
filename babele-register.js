import {Converters} from "../babele/script/converters.js";

Hooks.once('init', () => {
	if(typeof Babele !== 'undefined') {

		console.log('***********************');
		console.log('*** Babele DnD5e ES ***');
		console.log('***********************');

		Babele.get().register({
			module: 'ravanno-dnd5e-es',
			lang: 'es',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			'dnd5ePages': (pages, translations) => {
				pages = Converters._pages(pages, translations);
	
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
							tooltip: translation.tooltip ?? data.system.tooltip
						}
					});
				});
			}
		});
	}
});
