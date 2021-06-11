/*
 * This code opens and closes the sign-in modal
 *
 * This was not written by me and is not part of the assignment delivery. It is
 * only included to make it possible to view the sign-in modal in a convenient
 * way.
 */

$(function() {
  // Opens the sign-in modal when the sign-in link is pressed
  $("#sign-in-link").on("click", function() {
    $("body").addClass("modal-open");
  });

  // Close the modal overlay when clicking the overlay background
  $(".modal-wrapper").on("click", function() {
    $("body").removeClass("modal-open");
  });

  // Stops the click event from propagating up to the modal wrapper, which would
  // close the modal overlay
  $(".modal-wrapper .modal").on("click", function(e) {
    e.stopPropagation();
  });
});