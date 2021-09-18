class Reaction {
    from = null;
    client = null;
    message = null;
    reactions = [];
    embed = null;
    reaction = '';
    static config({ message, client }) {
        this.client = client;
        this.message = message;
        return this;
    }
    static async initial({ embed, reactions }) {
        this.from = await this.message.channel.send({ embeds: [embed] });
        this.embed = this.from;
        console.log(this.embed.id)
        this.reactions = reactions;
        const self = this;
        Promise.all(Object.values(reactions).map(reaction => this.embed.react(reaction)));
        return this;
    }

    static async on(reaction, { goTo }) {
        this.reactions = goTo.reactions;
        this.reaction = reaction;

        let self = this;
        this.client.on('messageReactionAdd', async (interaction, user) => {
            if (user.bot) return self;
            const reactedEmoji = interaction._emoji.name;
            if (reactedEmoji === reaction && self.reactions.includes(reactedEmoji)) {
                Promise.resolve(self.embed.reactions.removeAll());
                self.reaction = reactedEmoji;
                await self.goTo(goTo.embed, goTo.reactions)
                return self;
            }
        });
        return this;
    }
    static async goTo(embed, reactions) {
        this.reactions = reactions;
        await this.embed.edit({ embeds: [embed] });
        Promise.all(Object.values(reactions).map(reaction => this.embed.react(reaction)));
    }
}
module.exports = Reaction;
// ReactClass(client).initial(embedInicial, {reactions: ['🥒', '🥒']})
//  .on('😎').goTo(outraEmbed, { reactions: ['🥒', '🥒', '🥒'] })
//  .on('🥒').goTo(maisOutraEmbed, {reactions: ['']})