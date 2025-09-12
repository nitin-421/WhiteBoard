import { useReducer } from 'react'
import toolboxContext from './toolbox-context'
import { COLORS, TOOL_ITEMS } from '../../constant'

const toolboxReducer = (state, action) => {
	switch (action.type) {
		case 'TOOLBOX_ACTIONS.CHANGE_STROKE':
			// console.log("Changing stroke to color:",action.payload.stroke);
			return {
				...state,
				[action.payload.tool]: {
					...state[action.payload.tool],
					stroke: action.payload.stroke,
				},
			};
		
		case 'TOOLBOX_ACTIONS.CHANGE_FILL':
			// console.log("Changing fill to color:", action.payload.fill);
			return {
				...state,
				[action.payload.tool]: {
					...state[action.payload.tool],
					fill: action.payload.fill,
				},
			};
		
		case 'TOOLBOX_ACTIONS.CHANGE_SIZE':
			// console.log("Changing size:", action.payload.size);
			return {
				...state,
				[action.payload.tool]: {
					...state[action.payload.tool],
					size: action.payload.size,
				},
			};
			
		default:
			return state;
	}
}


const initialToolboxState = {
	[TOOL_ITEMS.LINE]:{
		stroke : COLORS.BLACK,
		size:1
	},
	[TOOL_ITEMS.ARROW]:{
		stroke : COLORS.BLACK,
		size:1
	},
	[TOOL_ITEMS.RECTANGLE]:{
		stroke : COLORS.BLACK,
		size:1,
		fill: null
	},
	[TOOL_ITEMS.ELLIPSE]:{
		stroke : COLORS.BLACK,
		size:1,
		fill: null
	},
	[TOOL_ITEMS.BRUSH]:{
		stroke : COLORS.BLACK,
		size:1
	},
}

const ToolboxProvider = ({children}) => {

	const [toolboxState, dispatchToolboxAction] = useReducer(
		toolboxReducer,
		initialToolboxState
	)

	const changeStrokeHandler=(tool,stroke)=>{
		// console.log("Changing stroke to color:", stroke);
		dispatchToolboxAction({
			type: 'TOOLBOX_ACTIONS.CHANGE_STROKE',
			payload: {
				tool,
				stroke
			},
		})
	}

	const changeFillHandler=(tool,fill)=>{
		// console.log("Changing fill to color:", fill);
		dispatchToolboxAction({
			type: 'TOOLBOX_ACTIONS.CHANGE_FILL',
			payload: {
				tool,
				fill
			},
		})
	}
	
	const changeSizeHandler=(tool,size)=>{
		console.log("Changing fill to color:", size);
		dispatchToolboxAction({
			type: 'TOOLBOX_ACTIONS.CHANGE_SIZE',
			payload: {
				tool,
				size
			},
		})
	}

	const toolboxContextValue = {
		toolboxState,
		changeStroke : changeStrokeHandler,
		changeFill : changeFillHandler,
		changeSize : changeSizeHandler,
	};
	
	return (
		<toolboxContext.Provider value={toolboxContextValue}>
			{children}
		</toolboxContext.Provider>
	)
}

export default ToolboxProvider;