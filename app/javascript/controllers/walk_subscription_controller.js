import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="walk-subscription"
export default class extends Controller {
  static values = { walkId: Number, currentUserId: Number  }
  static targets = ["messages"]


  connect() {
    this.channel = createConsumer().subscriptions.create(
      { channel: "WalkChannel", id: this.walkIdValue },
      { received: data => this.#insertMessage(data) }
    )
  }
  #insertMessage(data) {
    // Logic to know if the sender is the current_user
    const currentUserIsSender = this.currentUserIdValue === data.sender_id;
    // Creating the whole message from the `data.message` String
    const messageElement = this.#buildMessageElement(currentUserIsSender, data.message);
    this.messagesTarget.insertAdjacentHTML('beforeend', messageElement);
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)

  }
  #buildMessageElement(currentUserIsSender, message) {
    return `
      <div class="message-row d-flex ${this.#justifyClass(currentUserIsSender)}">
        <div class="${this.#userStyleClass(currentUserIsSender)}">
          ${message}
        </div>
      </div>
    `
  }
  #justifyClass(currentUserIsSender) {
    return currentUserIsSender ? "justify-content-end" : "justify-content-start"
  }
  #userStyleClass(currentUserIsSender) {
    return currentUserIsSender ? "user-message" : "message-member"
  }
  resetForm(event) {
    event.target.reset()
  }
}
