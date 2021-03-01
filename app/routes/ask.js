import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { set, get } from '@ember/object';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  model() {
    const question = this.store.createRecord("question");
    return {
      question,
      tag: "TAaaaaag",
      tags: []
    }
  },
  actions: {
    async ask() {
      const { question } = this.controller.model;
      set(question, "tags", this.controller.model.tags)
      await question.save();
      this.transitionTo("questions");
    },
    addTag(tag) {
      get(this.controller.model, "tags").pushObject(tag)
      set(this.controller.model, "tag", "")
    },
    removeTagAtIndex(index) {
      get(this.controller.model, "tags").removeAt(index);
    },
  },
});
