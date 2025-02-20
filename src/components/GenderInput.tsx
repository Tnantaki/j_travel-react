const GenderInput = () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="body2 text-light-grey ps-3">Gender</p>
      <div className="flex flex-row gap-2">
        <input type="radio" name="gender" id="female" value="female" />
        <label
          htmlFor="female"
          className="text-neutral-white text-lg font-normal me-2"
        >
          Female
        </label>
        <input type="radio" name="gender" id="male" value="male" />
        <label
          htmlFor="male"
          className="text-neutral-white text-lg font-normal"
        >
          Male
        </label>
      </div>
    </div>
  );
};

export default GenderInput;
