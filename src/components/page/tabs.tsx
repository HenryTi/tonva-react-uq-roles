import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { IObservableValue } from 'mobx/lib/internal';
import '../../css/va-tab.css';

export type TabCaption = (selected:boolean) => JSX.Element;

export interface TabProp {
    name: string;
    caption: TabCaption;
    content: () => JSX.Element;
    notify?: IObservableValue<number>;
    load?: () => Promise<void>;
	onShown?: () => Promise<void>;
	isSelected?: boolean;
}

export interface TabsProps {
    tabs: TabProp[];
    tabPosition?: 'top' | 'bottom';
    size?: 'sm' | 'lg' | 'md';
    tabBg?: string;
    contentBg?: string;
    sep?: string;
    selected?: string;
    borderColor?: string;
    borderWidth?: string;
}

class Tab {
	private loaded: boolean = false;
    name: string;
    @observable selected: boolean;
    caption: TabCaption;
    contentBuilder: ()=>JSX.Element;
    notify: IObservableValue<number>;
    load?: () => Promise<void>;
    onShown?: () => Promise<void>;

    private _content: JSX.Element;
    
    get content(): JSX.Element {
		if (this.load && this.loaded === false) return;
		if (this.selected === false) return this._content;
		if (!this._content) {
			this._content = this.contentBuilder();
		}
		return this._content;
    }

    async shown() {
        if (this.onShown !== undefined) {
            await this.onShown();
        }
        if (this.load !== undefined) {
			if (this.loaded === false) {
				this.loaded = true;
				await this.load();
			}
        }
    }
}

export const TabCaptionComponent = (label:string, icon:string, color:string) => <div 
    className={'d-flex justify-content-center align-items-center flex-column cursor-pointer ' + color}>
    <div><i className={'fa fa-lg fa-' + icon} /></div>
    <small>{label}</small>
</div>;

export class TabsView {
	private props: TabsProps;
    private size: string;
    private tabBg: string;
    private contentBg: string;
    private sep: string;
    @observable private selectedTab: Tab;
    @observable private tabArr: Tab[];

    constructor(props: TabsProps) {
		this.props = props;
		let {size, tabs, tabBg: tabBack, contentBg: contentBack, sep, selected} = props;
		this.size = size || 'md';
        this.tabArr = tabs.map(v => {
            let tab = new Tab();
            let {name, caption, content, notify, load, onShown, isSelected} = v;
			tab.name = name;
			if (isSelected === true || name === selected) {
				this.selectedTab = tab;
			}
			tab.selected = false;
            tab.caption = caption;
            tab.contentBuilder = content;
            tab.notify = notify;
            tab.load = load;
            tab.onShown = onShown;
            return tab;
        });
        this.tabBg = tabBack;
        this.contentBg = contentBack;
        this.sep = sep;
        if (this.selectedTab === undefined) {
			this.selectedTab = this.tabArr[0];
		}
        this.selectedTab.selected = true;
    }

    tabClick = async (tab:Tab) => {
		if (!tab) {
			tab = this.selectedTab;
			if (tab === undefined) {
				if (this.tabArr === undefined) return;
				if (this.tabArr.length === 0) return;
				tab = this.tabArr[0];
			}
		}

        await tab.shown();
        this.selectedTab.selected = false;
        tab.selected = true;
        this.selectedTab = tab;
    }

	/*
    showTab(tabName: string) {
        let tab = this.tabs.find(v => v.name === tabName);
        if (tab === undefined) return;
        if (this.selectedTab !== undefined) this.selectedTab.selected = false;
        tab.selected = true;
        this.selectedTab = tab;
	}
	*/

	private tabs = observer(() => {
        let {tabPosition, borderColor} = this.props;
        let bsCur:React.CSSProperties, bsTab:React.CSSProperties
        if (borderColor) {
            bsCur = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
            }
            bsTab = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
            }
            if (tabPosition === 'top') {
                bsCur.borderBottomWidth = 0;
                bsCur.borderTopLeftRadius = 10;
                bsCur.borderTopRightRadius = 10;
                bsTab.borderTopWidth = 0;
            }
            else {
                bsCur.borderTopWidth = 0;
                bsCur.borderBottomLeftRadius = 10;
                bsCur.borderBottomRightRadius = 10;
                bsTab.borderBottomWidth = 0;
            }
        }
		let cn = classNames('tv-tabs', this.tabBg, this.sep, 'tv-tabs-' + this.size);
		let tabs = <div className={cn}>
            {this.tabArr.map((v,index) => {
                let {selected, caption, notify} = v;
                let notifyCircle:any;
                if (notify !== undefined) {
                    let num = notify.get();
                    if (num !== undefined) {
                        if (num > 0) notifyCircle = <u>{num>99?'99+':num}</u>;
                        else if (num < 0) notifyCircle = <u className="dot" />;
                    }
                }
                return <div key={index} onClick={()=>this.tabClick(v)} style={selected===true? bsCur:bsTab}>
					<div>
					{notifyCircle}
					{caption(selected)}
					</div>
                </div>
            })}
		</div>;
		return tabs;
	});

	content = observer(() => {
		let displayNone:React.CSSProperties = {visibility: 'hidden'};
		return <>
			{this.tabArr.map((v,index) => {
				let {tabPosition} = this.props;
				let tabs = <this.tabs />;
				let cnContainer:string, main:any;
				let visibility:React.CSSProperties = {visibility:'hidden'};
				if (tabPosition === 'top') {
					cnContainer = 'tv-page-header';
					main = <>
						<section className={cnContainer}>
							<header>{tabs}</header>
						</section>
						<header style={visibility}>{tabs}</header>
						{v.content}
					</>;
				}
				else {
					cnContainer = 'tv-page-footer';
					main = <>
						{v.content}
						<footer style={visibility}>{tabs}</footer>
						<section className={cnContainer}>
							<footer>{tabs}</footer>
						</section>
					</>;
				}
				let style:React.CSSProperties;
				if (v.selected===false) style = displayNone;
				return <div key={index} className={classNames('tv-page', this.contentBg)} style={style}>
					<article>
						{main}
					</article>
				</div>;
			})}
		</>;
	});

    render() {
		let {tabPosition} = this.props;
		let tabs = <this.tabs />;
		let cnContainer:string, header:any, footer:any;
		let visibility:React.CSSProperties = {display:'none'};
		if (tabPosition === 'top') {
			cnContainer = 'tv-page-header';
			header = <header>{tabs}</header>;
		}
		else {
			cnContainer = 'tv-page-footer';
			footer = <footer>{tabs}</footer>;
		}
		return <>
			{header}
			{this.tabArr.map((v,index) => {
				let style:React.CSSProperties;
				if (v.selected===false) style = visibility;
				return <div key={index} className={classNames(this.contentBg)} style={style}>
					{v.content}
				</div>;
			})}
			{footer}
		</>;
    }
};

@observer export class Tabs extends React.Component<TabsProps> {
	private readonly tabsView: TabsView;
    constructor(props: TabsProps) {
		super(props);
		this.tabsView = new TabsView(props);
		setTimeout(() => {
			this.tabsView.tabClick(undefined);
		}, 100);
    }

    render() {
		return this.tabsView.render();
    }
};
/*
{
	tabPosition === 'top'? 
		<>{tabs}{content}</> :
		<>{content}{tabs}</>
}
*/