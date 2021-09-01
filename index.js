const { Plugin } = require('powercord/entities');
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');
const { Tooltip } = require('powercord/components');
const { inject, uninject } = require('powercord/injector');
const arrow = require('./assets/components/arrow');

module.exports = class nebula extends Plugin {
	startPlugin() {
		this.loadStylesheet('index.css');
		const classes = getModule(['iconWrapper', 'clickable'], false);
		const HeaderBarContainer = getModuleByDisplayName('HeaderBarContainer', false);
		inject('nebula-inject', HeaderBarContainer.prototype, 'renderLoggedIn', (_, res) => {
			const Arrow = React.createElement(
				Tooltip,
				{ text: 'Hide', position: 'bottom' },
				React.createElement(
					'div',
					{
						onClick: () => {
							document.querySelector('.guilds-1SWlCJ')?.classList.toggle('active');
							document.querySelector('.sidebar-2K8pFh')?.classList.toggle('active');
							document.querySelector('.nebula-arrow')?.classList.toggle('active');
						},
						className: ['nebula-arrow', classes.iconWrapper, classes.clickable].join(' '),
					},
					React.createElement(arrow)
				)
			);
			res.props.children[0].props?.children?.unshift(Arrow) || res.props.children.unshift(Arrow);
			return res;
		});
	}

	pluginWillUnload() {
		uninject('nebula-inject');
	}
};