export default class readyHandler {
    constructor(context) {
        this.client = context.client;
        this.config = context.config;
        this.log = this.config.log;
        this.dao = context.dao;

        this.readyHandler();
    };

    readyHandler() {
        console.log(this.log.ready);
        this.loadAvatars().then(async avatars => {
            await this.dao.delAvatars();
            avatars.forEach(el => {
                this.dao.addAvatar(el.name, el.imageURL, el.emojiID);
            });
        });
        
    };

    async loadAvatars() {

        return [ //for fast testing
            {
              name: 'Rem',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730928541769758/Rem.png',
              emojiID: '872904188391198740'
            },
            {
              name: 'Mashiro',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730683539906621/Mashiro.png',
              emojiID: '872907061774676008'
            },
            {
              name: 'Saber',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730665231761468/Saber.png',
              emojiID: '872907060298256445'
            },
            {
              name: 'Touka',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730648022544454/Touka.png',
              emojiID: '872904186994499616'
            },
            {
              name: 'Mikasa',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730608130510958/Mikasa.png',
              emojiID: '872904186721878117'
            },
            {
              name: 'Asuna',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730598085136384/Asuna.png',
              emojiID: '872904186881261638'
            },
            {
              name: 'Megumin',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730587163189268/Megumin.png',
              emojiID: '872904187296485406'
            },
            {
              name: 'Ram',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730564727840848/Ram.png',
              emojiID: '872904188064063528'
            },
            {
              name: 'Rin',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730550819520522/Rin.png',
              emojiID: '872904187778859089'
            },
            {
              name: 'Shinobu',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730536395325450/Shinobu.png',
              emojiID: '872904188051456010'
            },
            {
              name: 'Felis',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730497107279882/Felix.png',
              emojiID: '872904187921440788'
            },
            {
              name: 'Asuka',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730448168153168/Asuka.png',
              emojiID: '872904188445749248'
            },
            {
              name: 'Rias',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730432821190676/Rias.png',
              emojiID: '872904188038881342'
            },
            {
              name: 'Kaguya',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730412634009651/Kaguya.png',
              emojiID: '872904188504440892'
            },
            {
              name: 'Koneko',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730372960063528/Koneko.png',
              emojiID: '872904188470898688'
            },
            {
              name: 'Makise',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730354274439248/Makise.png',
              emojiID: '872904188907106374'
            },
            {
              name: 'Aqua',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730340009631784/Aqua.png',
              emojiID: '872904188156334140'
            },
            {
              name: 'Zero Two',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730328718569532/Zero_Two.png',
              emojiID: '872904189322330152'
            },
            {
              name: 'Nezuko',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730301979885588/Nezuko.png',
              emojiID: '872904188584136741'
            },
            {
              name: 'Astolfo',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730280622477362/Astolfo.png',
              emojiID: '872904188311519242'
            },
            {
              name: 'Akame',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730247554568242/Akame.png',
              emojiID: '872904187283906681'
            },
            {
              name: 'Rei',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730212272095232/Rei.png',
              emojiID: '872904188449943603'
            },
            {
              name: 'Haruhi',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730188972744754/Haruhi.png',
              emojiID: '872904188944855142'
            },
            {
              name: 'Sinon',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730166457720842/Sinon.png',
              emojiID: '872904189100040252'
            },
            {
              name: 'Sasha',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730151941214229/Sasha.png',
              emojiID: '872904190412873788'
            },
            {
              name: 'Taiga',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730135621201990/Taiga.png',
              emojiID: '872907060898045993'
            },
            {
              name: 'Albedo',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730114955857970/Albedo.png',
              emojiID: '872912720205324319'
            },
            {
              name: 'Holo',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730085901893682/Holo.png',
              emojiID: '872907060126294077'
            },
            {
              name: 'Yumeko',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730072928944148/Yumeko.png',
              emojiID: '872907060541542491'
            },
            {
              name: 'Shiro',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730053681258546/Shiro.png',
              emojiID: '872907060176633889'
            },
            {
              name: 'Raphtalia',
              imageURL: 'https://cdn.discordapp.com/attachments/883729587673120818/883730020340744202/Raphtalia.png',
              emojiID: '872907061896290364'
            }
          ];

        const channel = this.client.channels.cache.get(this.config.avatar_channel_id);
        const messages = await channel.messages.fetch();

        let avatars = [];
        const msgs = messages.keys();
        for (let i = 0; i < messages.size; i++) {
            const element = messages.get(msgs.next().value);
            let emojiID = null;

            const keys = element.reactions.cache.keys();
            for (let i = 0; i < element.reactions.cache.size; i++) {
                const reaction = element.reactions.cache.get(keys.next().value);
    
                if(await reaction.users.fetch().then(user => {
                    if (user.entries().next().value[1].id == this.config.owner_id) return true;
                    else return false;
                })) emojiID = reaction._emoji.id;
            };

            const attachmentID = element.attachments.keys().next().value;
            const attachment = element.attachments.get(attachmentID);
    
            avatars.push({
                name: element.content,
                imageURL: attachment.url,
                emojiID: emojiID
            });
        };

        return avatars;
    };
};