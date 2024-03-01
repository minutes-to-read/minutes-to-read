/**
 * minutes-to-read v1.0.0 - MIT License
 */

; (function ($)
{

	$.fn.minutesToRead = function (options)
	{

		// define default parameters
		const defaults = {
			readingTimeTarget: '.eta',
			readingTimeAsNumber: false,
			wordCountTarget: null,
			wordsPerMinute: 270,
			round: true,
			lang: 'en',
			lessThanAMinuteString: '',
			prependTimeString: '',
			prependWordString: '',
			remotePath: null,
			remoteTarget: null,
			success: function () { },
			error: function () { }
		};

		const plugin = this;
		const el = $(this);

		let wordsPerSecond;
		let lessThanAMinute;
		let minutesToRead;

		let totalWords;
		let totalReadingTimeSeconds;

		let readingTimeMinutes;
		let readingTimeSeconds;
		let readingTime;
		let readingTimeObj;

		// merge defaults and options
		plugin.settings = $.extend({}, defaults, options);

		// define vars
		const s = plugin.settings;

		const setTime = function (o)
		{

			if (o.text !== '')
			{
				if (s.lang == "ja" || s.lang == "kr" || s.lang == "zh")
				{
					let text = o.text.trim();
					// step 1: count the number of CJK characters
					const charArray = text.match(/[\u4e00-\u9fa5]/g);
					let charCount = 0;
					if (charArray != null)
					{
						charCount = charArray.length;
					}
					// step 2: replace all the CJK characters with blank
					text = text.replace(/[\u4e00-\u9fa5]/g, " ");
					// step 3:replace newlines with blank
					text = text.replace(/[\r\n]/g, " ");
					// step 4:replace special characters with blank
					text = text.replace(/\W+/g, " ");
					// step 5: count the number of total English words
					const totalEnWords = text.trim().split(/\s+/g).length;
					totalWords = totalEnWords + charCount;
				} else
				{
					//split text by spaces to define total words
					totalWords = o.text.trim().split(/\s+/g).length;
				}

				//define words per second based on words per minute (s.wordsPerMinute)
				wordsPerSecond = s.wordsPerMinute / 60;

				//define total reading time in seconds
				totalReadingTimeSeconds = totalWords / wordsPerSecond;

				// define reading time
				readingTimeMinutes = Math.floor(totalReadingTimeSeconds / 60);

				// define remaining reading time seconds
				readingTimeSeconds = Math.round(totalReadingTimeSeconds - (readingTimeMinutes * 60));

				// format reading time
				readingTime = `${readingTimeMinutes}:${readingTimeSeconds}`;
				// if s.round
				if (s.round)
				{

					// if minutes are greater than 0
					if (readingTimeMinutes > 0)
					{

						// set reading time by the minute
						$(s.readingTimeTarget).text(s.prependTimeString + readingTimeMinutes + ((!s.readingTimeAsNumber) ? ' ' + minutesToRead : ''));

					} else
					{

						// set reading time as less than a minute
						$(s.readingTimeTarget).text((!s.readingTimeAsNumber) ? s.prependTimeString + lessThanAMinute : readingTimeMinutes);
					}

				} else
				{

					// set reading time in minutes and seconds
					$(s.readingTimeTarget).text(s.prependTimeString + readingTime);
				}

				// if word count container isn't blank or undefined
				if (s.wordCountTarget !== '' && s.wordCountTarget !== undefined)
				{

					// set word count
					$(s.wordCountTarget).text(s.prependWordString + totalWords);
				}

				readingTimeObj = {
					wpm: s.wordsPerMinute,
					words: totalWords,
					eta: {
						time: readingTime,
						minutes: readingTimeMinutes,
						seconds: totalReadingTimeSeconds
					}
				};

				// run success callback
				s.success.call(this, readingTimeObj);

			} else
			{

				// run error callback
				s.error.call(this, {
					error: 'The element does not contain any text'
				});
			}
		};

		// if no element was bound
		if (!this.length)
		{

			// run error callback
			s.error.call(this, {
				error: 'The element could not be found'
			});

			// return so chained events can continue
			return this;
		}

		// Use switch instead of ifs
		switch (s.lang)
		{
			// if s.lang is Arabic
			case 'ar':
				lessThanAMinute = s.lessThanAMinuteString || "أقل من دقيقة";
				minutesToRead = 'دقائق للقراءة';
				break;
			// if s.lang is Czech
			case 'cz':
				lessThanAMinute = s.lessThanAMinuteString || "Méně než minutu";
				minutesToRead = 'minut na čtení';
				break;
			// if s.lang is Danish
			case 'da':
				lessThanAMinute = s.lessThanAMinuteString || "Mindre end et minut";
				minutesToRead = 'minutter at læse';
				break;
			// if s.lang is German
			case 'de':
				lessThanAMinute = s.lessThanAMinuteString || "Weniger als eine Minute";
				minutesToRead = 'Minuten zum Lesen';
				break;
			// if s.lang is Spanish
			case 'es':
				lessThanAMinute = s.lessThanAMinuteString || "Menos de un minuto";
				minutesToRead = 'minutos para leer';
				break;
			// if s.lang is French
			case 'fr':
				lessThanAMinute = s.lessThanAMinuteString || "Moins d'une minute";
				minutesToRead = 'minutes pour lire';
				break;
			// if s.lang is Hungarian
			case 'hu':
				lessThanAMinute = s.lessThanAMinuteString || "Kevesebb mint egy perc";
				minutesToRead = 'perc az olvasásra';
				break;
			// if s.lang is Icelandic
			case 'is':
				lessThanAMinute = s.lessThanAMinuteString || "Minna en eina mínútu";
				minutesToRead = 'mínútur til að lesa';
				break;
			// if s.lang is Italian
			case 'it':
				lessThanAMinute = s.lessThanAMinuteString || "Meno di un minuto";
				minutesToRead = 'minuti per leggere';
				break;
			// if s.lang is Dutch
			case 'nl':
				lessThanAMinute = s.lessThanAMinuteString || "Minder dan een minuut";
				minutesToRead = 'minuten om te lezen';
				break;
			// if s.lang is Norwegian
			case 'no':
				lessThanAMinute = s.lessThanAMinuteString || "Mindre enn ett minutt";
				minutesToRead = 'minutter å lese';
				break;
			// if s.lang is Polish
			case 'pl':
				lessThanAMinute = s.lessThanAMinuteString || "Mniej niż minutę";
				minutesToRead = 'minut na przeczytanie';
				break;
			// if s.lang is Russian
			case 'ru':
				lessThanAMinute = s.lessThanAMinuteString || "Меньше минуты";
				minutesToRead = 'минут на чтение';
				break;
			// if s.lang is Slovak
			case 'sk':
				lessThanAMinute = s.lessThanAMinuteString || "Menej než minútu";
				minutesToRead = 'minút na čítanie';
				break;
			// if s.lang is Swedish
			case 'sv':
				lessThanAMinute = s.lessThanAMinuteString || "Mindre än en minut";
				minutesToRead = 'minuter att läsa';
				break;
			// if s.lang is Turkish
			case 'tr':
				lessThanAMinute = s.lessThanAMinuteString || "Bir dakikadan az";
				minutesToRead = 'dakika okuma';
				break;
			// if s.lang is Ukrainian
			case 'uk':
				lessThanAMinute = s.lessThanAMinuteString || "Менше хвилини";
				minutesToRead = 'хвилин на читання';
				break;
			// if s.lang is Greek
			case 'el':
				lessThanAMinute = s.lessThanAMinuteString || 'Λιγότερο από λεπτό';
				minutesToRead = 'λεπτά για ανάγνωση';
				break;
			// if s.lang is Portuguese
			case 'pt':
				lessThanAMinute = s.lessThanAMinuteString || 'Menos de um minuto';
				minutesToRead = 'minutos para ler';
				break;
			// if s.lang is Korean
			case 'kr':
				lessThanAMinute = s.lessThanAMinuteString || '1분 이하';
				minutesToRead = '분읽는데';
				break;
			// if s.lang is Chinese
			case 'zh':
				lessThanAMinute = s.lessThanAMinuteString || '不到 1 分鐘';
				minutesToRead = '分鐘閱讀時間';
				break;
			// if s.lang is Japanese
			case 'ja':
				lessThanAMinute = s.lessThanAMinuteString || '1 分未満';
				minutesToRead = '分で読めます';
				break;
			// default s.lang in english
			default:
				lessThanAMinute = s.lessThanAMinuteString || 'Less than a minute';
				minutesToRead = 'minutes to read';
		}

		// for each element
		el.each(function (index)
		{

			// if s.remotePath and s.remoteTarget aren't null
			if (s.remotePath != null && s.remoteTarget != null)
			{

				// get contents of remote file
				$.get(s.remotePath, function (data)
				{
					let wrapper = document.createElement('div');

					wrapper.innerHTML = data;

					// set time using the remote target found in the remote file
					setTime({
						text: $(wrapper).find(s.remoteTarget).text()
					});
				});

			} else
			{

				// set time using the targeted element
				setTime({
					text: el.text()
				});
			}
		});

		return true;
	}
})(jQuery);