export function Tabs(props) {
    return (
        <div className="bg-gray-100 px-8 pt-2 shadow-md dark:bg-black-100">
            <ul className="-mb-px flex">
                {props.children}
            </ul>
        </div>
    )
};

export function Tab(props) {
    return (
        <li onClick={props.onClick} className={`no-underline border-b-2 border-transparent cursor-pointer tracking-wide font-bold py-3 mb-2 mr-8 ${(props.active ? 'text-red-400 border-red-400' : 'text-gray-500 hover:border-opacity-40 hover:border-gray-500')}`}>
            {props.children}
        </li>
    )
};

export function Content(props) {
    return (
        <div className={`${props.className ? props.className : ''} ${(props.active ? '' : 'hidden')}`}>
            {props.children}
        </div>
    )
};