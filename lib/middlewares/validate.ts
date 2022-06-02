import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_, res) => {
    res.json({
      error: "Validation Error",
    });
  },
});
