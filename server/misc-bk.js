const { collectionOutputError, find } = require('./utils');

const misc = {

    conv: (db, response) => {
        const fs = require('fs');
        const gCursor = db.collection('games').find({});
        gCursor.sort({ "old_id": 1 }).forEach((game) => {
            const id = game._id;
            const oldPath = path.join(__dirname, `../static/images/games/additional/${id}.png`);
            const newPath = path.join(__dirname, `../static/images/games/gameplay/${id}/2.png`);
            const fexO = fs.existsSync(oldPath);
            if (fexO) {
                fs.renameSync(oldPath, newPath);
                console.log(`Moved ${game.title}, ${game.old_id} to ${game._id}`);
            }
        });
    },

    /*modifyFileWriteNew: (response, type, code) => {

				let feedback = [];
				let lastFileFound = false;
				const dir = path.join(__dirname, '../static/images/companies/')
				fs.readdir(dir, function (err, files) {
					files.forEach(function(f) {
						const name = f.substr(0,f.length-4).replace('.','-').split(/(?=[A-Z])/).join('-').toLowerCase()
						const data = fs.readFileSync(dir + f);
						fs.mkdirSync(`${dir}${name}`)
						fs.writeFileSync(`${dir}${name}/1.png`, data)
						console.log(`wrote ${name}`)
					})
				})
				response.json(feedback);

			}*/

    index: (db, response, pag) => {
        // PHASE 2: , "otherNames.reasonForName": { "$ne": "japanese-script" }
        const gCursor = db.collection('games').find({});
        let links = [];
        const pp = parseInt(pag, 10) || 0;

        gCursor.count().then((total) => {
            gCursor.sort({ "title": 1 }).skip(50 * pp).limit(50).toArray((err, games) => {
                for (g of games) {
                    let onS = '';
                    if (g.otherNames) {
                        for (on of g.otherNames) {
                            onS += `<div style="font-size:12px; color:#777">${on.name} <em>(${on.reasonForName})</em></div>`;
                        }
                    }
                    let x = `<li>
                    	<a href="upd/${g._id}">${g.title}</a>
                    	&nbsp; 
                    	<form action="/updy" method="post" style="display:inline-block">
                    		<input type="hidden" name="id" value="${g._id}">
                    		<input type="hidden" name="title" value="${g.title}">
                    		<select name="year" style="width:100px" onchange="this.form.submit()">
                    			<option value=""></option>
                    			<option value="1990">1990</option>
                    			<option value="1991">1991</option>
                    			<option value="1992">1992</option>
                    			<option value="1993">1993</option>
                    			<option value="1994">1994</option>
                    			<option value="1995">1995</option>
                    			<option value="1996">1996</option>
                    			<option value="1997">1997</option>
                    			<option value="1998">1998</option>
                    			<option value="1999">1999</option>
                    			<option value="2000">2000</option>
                    		</select>
                    		<!--button type="submit">&gt;</button-->
                    	</form>
                    	${onS}
                    </li>`;
                    links.push(x);
                }
                response.set('Content-Type', 'text/html');
                response.status(200);
                response.send(`<!doctype html><html>
                	<head><style>*{ font-family:Baskerville,sans-serif }</style></head>
                	<body>
                	<h1>List</h1><hr>
                	<em>${total} items &middot; pag ${pp}</em><hr>` +
                    `<ol start="${50*pp}">` + links.join('<br />') + `</ol><hr>
                	<a href="pag.${pp-1}">prev page</a> &middot; <a href="pag.${pp+1}">next page</a>
                	</body></html>`);
            });
        });
    },

    changetypeexec: (db, response, params) => {

        const oId = require('mongodb').ObjectId;

        const set = { otherNames: [] };

        let mods = '';

        let contador = 0;
        for (name of params.onn) {
            if (name) {
                let newN = { "name": name, "reasonForName": params.onr[contador] };
                let chgStr = `(${params.onr[contador]}`;
                if (params.onr[contador] === 'local' || params.onr[contador] === 'modified') {
                    newN.place = [];
                    newN.place.push(params.onpa[contador]);
                    chgStr += ` -&gt; ${params.onpa[contador]}`;
                    if (params.onpb[contador]) {
                        newN.place.push(params.onpb[contador]);
                        chgStr += ` + ${params.onpb[contador]}`;
                    }
                    if (params.onpc[contador]) {
                        newN.place.push(params.onpc[contador]);
                        chgStr += ` + ${params.onpc[contador]}`;
                    }
                }
                set.otherNames.push(newN);
                mods += `Other name added/modified: <code>${name} ${chgStr})</code><hr>`;
                contador++;
            }
        }

        if (params.newtitle) {
            set.title = params.newtitle;
            mods += `Main title changed from <b>${params.title}</b> to <code>${params.newtitle}</code><hr>`;
        }
        if (params.newyear) {
            set.year = parseInt(params.newyear, 10);
            mods += `Year changed to <code>${params.newyear}</code><hr>`;
        }
        if (params.company2) {
            set.company = [params.company1, params.company2];
            mods += `Other company added: <code>${params.company2} (${params.company1} was there)</code><hr>`;
        }

        console.log(set);

        db.collection('games').updateOne({ _id: new oId(params.id) }, { $set: set }).then(function(r) {
            response.set('Content-Type', 'text/html');
            response.status(200);
            response.send(`<style>code{ padding:2px 4px; border:#888; color:#888; margin:0 2px }</style>
            	<h3>#${params.id} - ${params.title}</h3>
        		${mods}
        		<code style="display:block;">${JSON.stringify(r.result)}</code><hr>
            	<a href="javascript:history.go(-2)">back</a>`);
        });

    },

    changetypeexecY: (db, response, params) => {

        const oId = require('mongodb').ObjectId;

        const set = { year: parseInt(params.year, 10) };

        console.log('*Y', set, params.title);

        db.collection('games').updateOne({ _id: new oId(params.id) }, { $set: set }).then(function(r) {
            response.set('Content-Type', 'text/html');
            response.status(200);
            response.send(`<style>code{ padding:2px 4px; border:#888; color:#888; margin:0 2px }</style>
            	<h3>#${params.id} - ${params.title}</h3>
        		Year added: ${params.year} for ${params.title}<hr>
        		<code style="display:block;">${JSON.stringify(r.result)}</code><hr>
            	<a href="javascript:history.go(-1)">back</a>`);
        });

    },

    changetype: (db, response, id) => {

        const oId = require('mongodb').ObjectId;

        db.collection('games').findOne({ _id: new oId(id) }).then(function(g) {

            let year = '';
            if (!g.year) {
                for (let i = 1990; i < 2000; i++) {
                    year += `<input type="radio" name="newyear" value="${i}">${i} &nbsp;`;
                }
                year += '<hr>';
            }

            const reasons = [
                "additional",
                "alternative",
                "alternative-conversion",
                "alternative-translation",
                "beta",
                "individual-games-grouped",
                "japanese-script",
                "local",
                "modified",
                "on-line",
                "presumed-unreleased",
                "reduced",
                "special",
                "sponsored",
                "unmodified",
                "unnoficial-homebrew-translation",
                "unnoficial-popular-hack",
                "wrong-aka",
                "wrongly-attributed-aka"
            ];

            const places = [
                "bra",
                "chi",
                "eur",
                "fra",
                "ger",
                "jap",
                "kor",
                "mex",
                "usa"
            ];

            let contador = 0;
            let onFields = '';
            g.otherNames = g.otherNames || null;
            const otherN = [...g.otherNames, { name: '', reasonForName: 'japanese-script' }, { name: '', reasonForName: '' }];
            for (on of otherN) {
                let selV = '';
                for (rs of reasons) {
                    let isSel = on.reasonForName == rs ? 'selected' : '';
                    selV += `<option value="${rs}" ${isSel}>${rs}</option>`;
                }
                let selP1 = '';
                for (p of places) {
                    let isSel = on.place && on.place[0] == p ? 'selected' : '';
                    selP1 += `<option value="${p}" ${isSel}>${p}</option>`;
                }
                let selP2 = '';
                for (p of places) {
                    let isSel = on.place && on.place[1] == p ? 'selected' : '';
                    selP2 += `<option value="${p}" ${isSel}>${p}</option>`;
                }
                let selP3 = '';
                for (p of places) {
                    let isSel = on.place && on.place[2] == p ? 'selected' : '';
                    selP3 += `<option value="${p}" ${isSel}>${p}</option>`;
                }

                onFields += `<input type="text" name="onn[${contador}]" placeholder="name" style="font-size:16px; 
        		padding:3px; width:500px" value="${on.name}">
        		<select name="onr[${contador}]" style='width:150px'>${selV}</select>
        		<select name="onpa[${contador}]"><option value=""></option>${selP1}</select>
        		<select name="onpb[${contador}]"><option value=""></option>${selP2}</select>
        		<select name="onpc[${contador}]"><option value=""></option>${selP3}</select><br>`;
                contador++;
            }


            response.set('Content-Type', 'text/html');
            response.status(200);
            response.send(`<h3>${g.title}</h3><code style="display:block;padding:10px; border:1px solid #ccc; color:#888">` + JSON.stringify(g) +
                `</code><hr>
            	<form action="/upd" method="post">
            		<input type="hidden" name="id" value="${id}">
            		<input type="hidden" name="title" value="${g.title}">
            		${year}
            		New MAIN title:<br>
            		<input type="text" name="newtitle" placeholder="New title (opt)" style="font-size:12px; padding:3px; width:500px">
            		<hr>
            		Company:<br>
            		<input type="text" name="company1" placeholder="Company 1" readonly value="${g.company[0]}" style="font-size:12px; padding:3px; width:200px">
            		<input type="text" name="company2" placeholder="Company 2" value="${g.company[1]?g.company[1]:''}" style="font-size:12px; padding:3px; width:200px">
            		<hr>
            		Other names:<br>${onFields}<button type="submit">go</button>
            	</form>`);
        });

    }
};

module.exports = misc;

/*
if (d.old_rec) {
					let rec = d.old_rec.trim().replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")
						.replace(/\s+/g, '-').toLowerCase();
					addons.push(rec.replace('x-', '-x').substr(1));
				}
				if (d.old_chip) {
					let chip = d.old_chip.trim().replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")
						.replace(/\s+/g, '-').toLowerCase();
					if (chip[0]==='-') chip = chip.substr(1);
					addons.push(chip);
				}
				if (addons[0] === "bazucae-mouse") {
					addons = ['super-scope', 'mouse'];
				}
				for (a in addons) {
					if (addons[a] === 'bazuca') addons[a] = 'super-scope';
					if (addons[a] === 'relogio') addons[a] = 'internal-clock';
				}
				oI = {addOns: addons};
*/
