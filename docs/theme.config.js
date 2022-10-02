const YEAR = new Date().getFullYear();

export default {
	projectLink: 'https://github.com/adiathasan/mui-react-hook-form-plus',
	docsRepositoryBase: 'https://github.com/adiathasan/mui-react-hook-form-plus/blob/master/pages',
	titleSuffix: ' – mui-react-hook-form-plus',
	search: true,
	unstable_flexsearch: true,
	floatTOC: true,
	darkMode: true,
	head: ({ meta = {} }) => {
		return (
			<>
				<meta name='author' content='Adiat Hasan' />
				<link rel='canonical' href='https://adiathasan' />
				<meta name='title' content={meta.title} />
				<meta property='description' content={meta.description} />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={meta.title} />
				<meta property='og:description' content={meta.description} />
				<meta property='og:url' content='https://adiathasan' />
				<meta property='og:image' content={meta.image || 'https://adiathasan/logo.png'} />
				<meta property='twitter:card' content={meta.image ? 'summary_large_image' : 'summary'} />
				<meta property='twitter:site' content='@adiat' />
				<meta property='twitter:title' content={meta.title} />
				<meta property='twitter:description' content={meta.description} />
				<meta property='twitter:url' content='https://adiathasan' />
				<meta property='twitter:image' content={meta.image || 'https://adiathasan/logo.png'} />
			</>
		);
	},
	logo: () => {
		return <div>mui-react-store-maker +</div>;
	},
	footer: (
		<div>
			<hr />
			<a href='https://github.com/adiathasan' target='_blank'>
				GitHub
			</a>{' '}
			<small style={{ display: 'block', marginTop: '8rem' }}>
				<abbr
					title='This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.'
					style={{ cursor: 'help' }}>
					CC BY-NC 4.0
				</abbr>{' '}
				<time>{YEAR}</time> © Adiat Hasan.
				<a href='/feed.xml'>RSS</a>
				<style jsx>{`
					a {
						float: right;
					}
				`}</style>
			</small>
		</div>
	),
};
