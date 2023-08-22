import React, { useState, useRef } from "react";
import Composer from "./Composer"; // Import Composer from its actual location

function MyApp() {
	const [composerPredefinedSetting] = useState("molOnly");
	const [chemObj, setChemObj] = useState(null);
	const composerRef = useRef();

	console.log("............//.....//loggg/..................//")

	const onComposerUserModificationDone = () => {
		const updatedChemObj = composerRef.current.getWidget().getChemObj();
		setChemObj(updatedChemObj);
	};

	return (
		<div>
			<Composer
				predefinedSetting={composerPredefinedSetting}
				onUserModificationDone={onComposerUserModificationDone}
				ref={composerRef}
			></Composer>
		</div>
	);
}

export default MyApp;
