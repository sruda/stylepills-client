/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as React from 'react';


// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/

interface IconType {
    logo: () => JSX.Element;
    arrowDown: () => JSX.Element;
    chevronDown: () => JSX.Element;
    heart: () => JSX.Element;
    messageCircle: () => JSX.Element;
    package: () => JSX.Element;
    eye: () => JSX.Element;
    search: () => JSX.Element;
}

/* Own Props */
type IconProps = {
    color?: string,
    width: string,
    height: string,
    icon: string,
    iconClass?: string
};


/***********************************************/
/*              CLASS DEFINITION               */
/***********************************************/
class Icon extends React.Component<IconProps, {}> {

    /********************************/
    /*         CONSTRUCTOR          */
    /********************************/
    constructor() {
        super();
    }


    /********************************/
    /*        RENDER MARKUP         */
    /********************************/
    render() {

        /*       PROPERTIES       */
        /**************************/
        const {
            color = '#000',
            width = '24px',
            height = '24px',
            icon = 'default',
            iconClass = 'stroke-black'
        } = this.props;

        const svg: IconType = {
            logo: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height} 
                         viewBox="0 0 22 22" 
                         xmlns="http://www.w3.org/2000/svg">
                        <defs />
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g transform="translate(-41.000000, -22.000000)" fillRule="nonzero">
                                <g transform="translate(0.000000, -1.000000)">
                                    <g transform="translate(41.000000, 22.000000)">
                                        <g transform="translate(0.000000, 1.000000)">
                                            {/* tslint:disable-next-line:max-line-length */}
                                            <path d="M11.3969342,19.3421576 C10.2386124,20.5020762 8.66663223,21.1538462 7.02738832,21.1538462 C5.3881444,21.1538462 3.81616419,20.5020762 2.65784241,19.3421576 L2.65784241,19.3421576 C1.49792376,18.1838358 0.846153846,16.6118556 0.846153846,14.9726117 C0.846153846,13.3333678 1.49792376,11.7613876 2.65784241,10.6030658 L11.4517439,1.80916434 C13.8653975,-0.603054779 17.777182,-0.603054779 20.1908357,1.80916434 L20.1908357,1.80916434 C22.6030548,4.22281801 22.6030548,8.13460247 20.1908357,10.5482561 L11.3969342,19.3421576 Z" fill="#39C1BC"/>
                                            <path d="M6.77573806,6.4686561 L2.69214109,10.5669814 C0.23375187,12.9094812 0.232037513,17.0581935 2.69214109,19.3990609 C5.15224467,21.7399284 8.91324915,21.7415608 11.3716384,19.3990609 L15.73449,15.0061904 C13.9023452,13.9807106 12.4379668,12.975056 10.9397868,11.5397774 C9.43272143,10.1151757 7.85297237,8.21125109 6.77573806,6.4686561 Z" fill="#F8E71C" />
                                            {/* tslint:disable-next-line:max-line-length */}
                                            <path d="M15.6538462,3.02197802 C14.4857354,3.02197802 13.5384615,2.47857647 13.5384615,1.81318681 C13.5384615,1.14779716 14.4857354,0.604395604 15.6538462,0.604395604 C16.8219569,0.604395604 17.7692308,1.14779716 17.7692308,1.81318681 C17.7692308,2.47857647 16.8277684,3.02197802 15.6538462,3.02197802 Z" fill="#FFFFFF" opacity="0.3"/>
                                            <path d="M21.6880634,4.22209285 C21.3936043,5.2047993 20.9080833,6.10702759 20.1872983,6.8312812 L11.394251,15.7148268 C9.85843316,17.2654265 7.62915137,17.888338 5.52221368,17.3556061 C3.415276,16.8228743 1.75766181,15.2250491 1.1270259,13.1266691 C0.267315204,15.8720468 1.3924485,18.8414822 3.85305878,20.2678199 C4.84145876,20.840764 5.93239411,21.1481277 7.01730816,21.1536396 C8.63327505,21.1618495 10.2315786,20.5308238 11.4230769,19.3557951 L20.2329876,10.4937228 C21.8469209,8.8673182 22.4001981,6.41608136 21.6880634,4.22209285 Z" fill="#454B54" opacity="0.2" />
                                        </g>                    
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                );
            },
            arrowDown: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round" 
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <line x1="12" y1="4" x2="12" y2="20" />
                         <polyline points="18 14 12 20 6 14" />
                    </svg>
                );
            },
            chevronDown: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <polyline points="6 9 12 15 18 9" />
                    </svg>
                );
            },
            heart: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                );
            },
            messageCircle: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                );
            },
            package: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
                         <polyline points="2.32 6.16 12 11 21.68 6.16" />
                         <line x1="12" y1="22.76" x2="12" y2="11" />
                         <line x1="7" y1="3.5" x2="17" y2="8.5" />
                    </svg>
                );
            },
            eye: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                         <circle cx="12" cy="12" r="3" />
                    </svg>
                );
            },
            search: () => {
                return (
                    <svg className={iconClass}
                         width={width}
                         height={height}
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke={color}
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         xmlns="http://www.w3.org/2000/svg">
                         <circle cx="10.5" cy="10.5" r="7.5" />
                         <line x1="21" y1="21" x2="15.8" y2="15.8" />
                    </svg>
                );
            }
        };

        return svg[icon || 'default']();
    }

}


/* Export */
export default Icon;