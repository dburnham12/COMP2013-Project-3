export default function FilterForm({
	options,
	selectedFilter,
	handleSelectFilter,
}) {
	return (
		<div className="FilterForm">
			<h3>Filter Price</h3>
			<input
				type="radio"
				name="filter"
				id="optionShowAll"
				value=""
				checked={selectedFilter === ""}
				onChange={handleSelectFilter}
			/>
			<label htmlFor="optionShowAll">Show All</label>
			{options.map((option) => {
				return (
					<span key={option}>
						<br />
						<input
							type="radio"
							name="filter"
							id={`option${option}`}
							value={option}
							checked={selectedFilter === option}
							onChange={handleSelectFilter}
						/>
						<label htmlFor={`option${option}`}>
							&lt; ${option}.00{/*&lt; html escape for '<'*/}
						</label>
					</span>
				);
			})}
		</div>
	);
}
